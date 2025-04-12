export function removeSpecialCharacters(value?: string) {
  if (typeof value === "string") {
    return value.replaceAll(/\D/g, "");
  }
}
