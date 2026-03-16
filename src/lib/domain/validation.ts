import { z } from "zod";
import { categories, pumps, shiftTypes } from "@/lib/domain/options";
import { calculateDurationMinutes, computeWindowCheck, isValidHHMM, resolveTimelineDate } from "@/lib/domain/time";
import { normalizeContainer, normalizePlate } from "@/lib/domain/identifiers";

const categoryRules = {
  PRODUCTIVE: { requiresClient: true, requiresPlate: true, requiresContainer: true, requiresNotes: false },
  IN_TRANSIT: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: false },
  WAITING_LAB: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: false },
  NO_TRUCK: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: false },
  NO_CONTAINER: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: false },
  MAINTENANCE: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: true },
  OTHER: { requiresClient: false, requiresPlate: false, requiresContainer: false, requiresNotes: true }
} as const;

const baseSchema = z.object({
  pump: z.enum(pumps),
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  shiftType: z.enum(shiftTypes),
  startTime: z.string(),
  endTime: z.string(),
  category: z.enum(categories),
  clientId: z.string().trim().min(1).nullable(),
  plate: z.string().trim().nullable(),
  container: z.string().trim().nullable(),
  notes: z.string().trim().nullable()
});

export type EventInput = z.infer<typeof baseSchema>;

export function validateEventInput(raw: unknown) {
  const parsed = baseSchema.parse(raw);

  if (!isValidHHMM(parsed.startTime) || !isValidHHMM(parsed.endTime)) {
    throw new Error("Time must be in HH:MM format.");
  }

  const normalized = {
    ...parsed,
    plate: normalizePlate(parsed.plate),
    container: normalizeContainer(parsed.container),
    notes: parsed.notes?.trim() || null
  };

  const rules = categoryRules[normalized.category];

  if (rules.requiresClient && !normalized.clientId) {
    throw new Error("Client is required for this category.");
  }

  if (rules.requiresPlate && !normalized.plate) {
    throw new Error("Plate is required for this category.");
  }

  if (rules.requiresContainer && !normalized.container) {
    throw new Error("Container is required for this category.");
  }

  if (rules.requiresNotes && !normalized.notes) {
    throw new Error("Notes are required for this category.");
  }

  const startDt = resolveTimelineDate(normalized.shiftDate, normalized.shiftType, normalized.startTime);
  let endDt = resolveTimelineDate(normalized.shiftDate, normalized.shiftType, normalized.endTime);

  if (endDt <= startDt) {
    if (normalized.shiftType === "NIGHT") {
      endDt = endDt.plus({ days: 1 });
    } else {
      throw new Error("Start time must be before end time.");
    }
  }

  const durationMinutes = calculateDurationMinutes(startDt.toISO() ?? "", endDt.toISO() ?? "");

  if (durationMinutes < 1) {
    throw new Error("Minimum duration is 1 minute.");
  }

  if (durationMinutes > 540) {
    throw new Error("Maximum duration is 9 hours.");
  }

  const warnings: string[] = [];

  if (!computeWindowCheck(normalized.shiftType, normalized.startTime)) {
    warnings.push("Start time falls outside the expected shift window.");
  }

  if (!computeWindowCheck(normalized.shiftType, normalized.endTime)) {
    warnings.push("End time falls outside the expected shift window.");
  }

  return {
    event: normalized,
    warnings,
    startAtIso: startDt.toISO() ?? "",
    endAtIso: endDt.toISO() ?? "",
    durationMinutes,
    productive: normalized.category === "PRODUCTIVE"
  };
}
