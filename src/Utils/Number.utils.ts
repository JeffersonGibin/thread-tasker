export const isGreaterThanZero = (value: number) => {
  const isNotFinite = !isFinite(value);

  if (typeof value !== "number" || isNaN(value) || isNotFinite) {
    return false;
  }

  return value > 0;
};
