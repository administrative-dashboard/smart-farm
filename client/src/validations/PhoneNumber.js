// PhoneNumber.js

export const validatePhoneNumber = (phoneNumber) => {
  const armenianPrefix = "+374";

  const isArmenian = phoneNumber.startsWith(armenianPrefix);
  const isZeroAfterPrefix = phoneNumber.startsWith("+3740");

  if (isArmenian) {
    const digitsAfterPrefix = phoneNumber.substring(armenianPrefix.length);

    const isNumeric = /^[0-9]+$/.test(digitsAfterPrefix);

    if (isNumeric) {
      const isPhoneNumberValid = digitsAfterPrefix.length === 8 && !isZeroAfterPrefix;

      return {
        isArmenian,
        isZeroAfterPrefix,
        isPhoneNumberValid,
        error: null, 
      };
    } else {
      return {
        isArmenian,
        isZeroAfterPrefix,
        isPhoneNumberValid: false,
        error: "Only digits are allowed after +374.",
      };
    }
  }

  return {
    isArmenian: false,
    isZeroAfterPrefix: false,
    isPhoneNumberValid: false,
    error: null,
  };
};
