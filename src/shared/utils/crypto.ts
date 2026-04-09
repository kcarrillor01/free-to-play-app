// Encriptamiento básico simple 

export const basicEncrypt = (text: string): string => {
  const base64 = btoa(text);
  return base64.split('').reverse().join('');
};

export const basicDecrypt = (encryptedText: string): string => {
  const reversed = encryptedText.split('').reverse().join('');
  return atob(reversed);
};

export const hashPassword = (password: string): string => {
  return basicEncrypt(password + '_salt');
};
