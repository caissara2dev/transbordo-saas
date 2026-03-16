import { DateTime } from "luxon";

export const OPERATIONS_TZ = "America/Sao_Paulo";

export function isValidHHMM(input: string) {
  return /^\d{2}:\d{2}$/.test(input);
}

export function resolveTimelineDate(shiftDate: string, shiftType: "MORNING" | "NIGHT", time: string) {
  const hour = Number(time.slice(0, 2));
  const minute = Number(time.slice(3, 5));

  let dt = DateTime.fromISO(shiftDate, { zone: OPERATIONS_TZ }).set({ hour, minute, second: 0, millisecond: 0 });

  if (shiftType === "NIGHT" && hour < 6) {
    dt = dt.plus({ days: 1 });
  }

  return dt;
}

export function calculateDurationMinutes(startAtIso: string, endAtIso: string) {
  const start = DateTime.fromISO(startAtIso, { zone: OPERATIONS_TZ });
  const end = DateTime.fromISO(endAtIso, { zone: OPERATIONS_TZ });
  return Math.round(end.diff(start, "minutes").minutes);
}

export function computeWindowCheck(shiftType: "MORNING" | "NIGHT", time: string) {
  const hour = Number(time.slice(0, 2));
  if (shiftType === "MORNING") {
    return hour >= 6 && hour < 18;
  }

  return hour >= 18 || hour < 6;
}
