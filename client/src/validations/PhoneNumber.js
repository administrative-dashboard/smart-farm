// PhoneNumber.js


export const validatePhoneNumber = (phoneNumber) => {
    const armenianPrefix = "+374";
    
    const isArmenian = phoneNumber.startsWith(armenianPrefix);
  
    if (!isArmenian) {
      return {
        isArmenian: false,
        isZeroAfterPrefix: false,
        isPhoneNumberValid: false,
      };
    }

    const isZeroAfterPrefix = phoneNumber.startsWith("+3740");
    const isPhoneNumberValid = phoneNumber.length === 12;
  
    return {
      isArmenian,
      isZeroAfterPrefix,
      isPhoneNumberValid,
    };
  };
  