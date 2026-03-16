function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, "").trim().toUpperCase();
}

export function normalizePlate(value: string | null | undefined) {
  if (!value) return null;
  const normalized = normalizeWhitespace(value);
  return normalized || null;
}

export function normalizeContainer(value: string | null | undefined) {
  if (!value) return null;
  const normalized = normalizeWhitespace(value);
  return normalized || null;
}
