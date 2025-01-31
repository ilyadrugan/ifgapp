export const isValidPhoneNumber = (phone: string): boolean => {
    const cleanedPhone = phone.replace(/[()\s-]/g, '');

    const phoneRegex = /^\+?\d{10,15}$/;

    return phoneRegex.test(cleanedPhone);
};
