import IMask from "imask";

export function maskCpf(value: string) {
  const str = value.replaceAll(/\D/g, "");
  const mask = IMask.createMask({ mask: "000.000.000-00" });

  mask.resolve(str);

  return mask.value;
}
