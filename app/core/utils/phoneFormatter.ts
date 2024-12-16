export const formatPhoneNumberToPlain = (phoneNumber: string) => {
    return phoneNumber.replace(/[^0-9]/g, '');
  };
