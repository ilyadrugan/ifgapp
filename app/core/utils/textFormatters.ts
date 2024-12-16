

export const maskDateChange = (text) => {
    // Удаляем все символы, кроме цифр
    const numericText = text.replace(/[^0-9]/g, '');

    // Форматируем дату в ДД.ММ.ГГГГ
    let formattedText = numericText;
    if (numericText.length > 2) {
      formattedText = `${numericText.slice(0, 2)}.${numericText.slice(2)}`;
    }
    if (numericText.length > 4) {
      formattedText = `${numericText.slice(0, 2)}.${numericText.slice(2, 4)}.${numericText.slice(4)}`;
    }

    // Ограничиваем длину ввода (ДД.ММ.ГГГГ = 10 символов)
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }

    return formattedText;
  };
