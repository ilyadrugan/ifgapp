import { Parser } from 'htmlparser2';

export function stripHtmlTags(htmlString) {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, '')
        .replaceAll('&nbsp;', ' ')
        .replace(/\u00A0/g, ' ')
        ;
}

export function parseHTMLToObjects(htmlString) {
    const result = [];
    let currentTag = null; // Хранит текущий тег для обработки текста внутри него

    const parser = new Parser(
      {
        onopentag(name, attributes) {
          currentTag = name;

          // Обработка каждого тега отдельно
          if (name === 'strong') {
            result.push({ strong: '' }); // Создаём объект для жирного текста
          } else if (name === 'em') {
            result.push({ em: '' }); // Создаём объект для текста курсивом
          } else if (name === 'span') {
            result.push({ span: '' }); // Создаём объект для текста в span
          } else if (name === 'p') {
            result.push({ p: '' }); // Создаём объект для параграфа
          } else if (name.startsWith('h')) {
            result.push({ [name]: '' }); // Создаём объект для заголовков h1-h6
          } else if (name === 'img') {
            result.push({ img: attributes.src }); // Добавляем ссылку на изображение
          } else if (name === 'a') {
            result.push({ a: attributes.href }); // Добавляем ссылку
          } else if (name === 'ul') {
            result.push({ ul: [] }); // Создаём объект для списка
          } else if (name === 'li') {
            const lastElement = result[result.length - 1];
            if (lastElement && lastElement.ul) {
              lastElement.ul.push(''); // Добавляем пустой элемент списка
            }
          }
        },
        ontext(text) {
          text = text.trim(); // Убираем пробелы

          if (currentTag && text) {
            const lastElement = result[result.length - 1];

            // Добавляем текст в последний объект
            if (currentTag === 'li') {
              const ul = lastElement.ul;
              ul[ul.length - 1] += text; // Добавляем текст в последний элемент списка
            } else if (lastElement && currentTag in lastElement) {
              lastElement[currentTag] += text; // Добавляем текст в соответствующий объект
            }
          }
        },
        onclosetag(name) {
          // Сбрасываем текущий тег, если он закрыт
          if (currentTag === name) {
            currentTag = null;
          }
        },
      },
      { decodeEntities: true } // Декодирует HTML-сущности
    );

    parser.write(htmlString);
    parser.end();

    return result;
  }

export  function parseHTMLToSequentialObjects(htmlString) {
    const result = [];
    const stack = []; // Для отслеживания вложенности

    const parser = new Parser(
      {
        onopentag(name, attributes) {
          const tagObject = { tag: name, attributes, children: [] };

          // Если есть вложенность, добавляем объект в children последнего тега
          if (stack.length > 0) {
            const parent = stack[stack.length - 1];
            parent.children.push(tagObject);
          } else {
            result.push(tagObject); // Иначе добавляем в корневой массив
          }

          // Пушим текущий тег в стек
          stack.push(tagObject);
        },
        ontext(text) {
          text = text.trim();
          if (text && stack.length > 0) {
            // Добавляем текст в children текущего открытого тега
            const parent = stack[stack.length - 1];
            parent.children.push({ text });
          } else if (text) {
            // Если нет текущего тега, добавляем текст в корень
            result.push({ text });
          }
        },
        onclosetag() {
          stack.pop(); // Убираем текущий тег из стека при закрытии
        },
      },
      { decodeEntities: true } // Декодируем HTML-сущности
    );

    parser.write(htmlString);
    parser.end();

    return result;
  }
