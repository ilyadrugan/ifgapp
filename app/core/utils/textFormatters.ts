

export const maskDateChange = (text: string) => {
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

export const formatRecommendation = (n: number) => {
    const absN = Math.abs(n); // Берем модуль числа на случай отрицательных чисел
    const lastDigit = absN % 10;
    const lastTwoDigits = absN % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${n} рекомендаций`;
    }

    if (lastDigit === 1) {
      return `${n} рекомендация`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${n} рекомендации`;
    }

    return `${n} рекомендаций`;
  };
