import IMask from "imask";

export function maskCelular(value: string, type: 'celular' | 'telefone') {
  const digits8 = IMask.createMask({ mask: '(00) 0000-0000' });
  const digits9 = IMask.createMask({ mask: '(00) 00000-0000' });
  const str = value.replace(/\D+/, '');

  if (type === 'celular') {
    digits9.resolve(str);
    return digits9.value;
  } else {
    digits8.resolve(str);
    console.log(digits8.value);
    
    return digits8.value;
  }
}