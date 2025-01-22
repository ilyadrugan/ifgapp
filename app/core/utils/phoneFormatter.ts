export const formatPhoneNumberToPlain = (phoneNumber: string) => {
    return phoneNumber.replace(/[^0-9]/g, '');
  };

export const formatPhoneNumberToPlus = (phoneNumber) => {
    // Преобразуем в строку и удаляем все лишние символы
    phoneNumber = phoneNumber.toString().replace(/\D/g, '');

    // Проверяем, начинается ли номер с "8"
    if (phoneNumber.startsWith('8')) {
        // Заменяем первую цифру на "+7"
        return '+7' + phoneNumber.slice(1);
    }
    console.log(phoneNumber);
    // Если номер уже в нужном формате, возвращаем его
    return phoneNumber;
};
