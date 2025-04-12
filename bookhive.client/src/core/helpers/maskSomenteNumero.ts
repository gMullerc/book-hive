export function maskSomenteNumeros(value: string) {
  if (!value) return "";

  const str = value.replaceAll(/\D/g, "");
  if (str.length == 0) return "";

  return str.replace(/^(\d+)$/, "$1");
}
