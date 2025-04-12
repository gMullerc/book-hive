import IMask from "imask";

export function maskCep(value: string) {
  const str = value.replaceAll(/\D/g, "");
  const mask = IMask.createMask({ mask: "00000-000" });

  mask.resolve(str);
  return mask.value;
}
