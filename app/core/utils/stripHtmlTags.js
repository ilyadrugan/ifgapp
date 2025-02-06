import { Parser } from 'htmlparser2';

export function stripHtmlTags(htmlString) {
    if (!htmlString) {return '';}
    return htmlString
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replaceAll('&nbsp;', ' ')
        .replaceAll('&mdash;', '—')
        .replaceAll('&ndash;', '-')
        .replace(/\u00A0/g, ' ')
        ;
}

export function stripWebHtmlSheluha(htmlString) {
  if (!htmlString) {return '';}
  return htmlString
      .replaceAll('&nbsp;', ' ')
      .replaceAll('&mdash;', '—')
      .replaceAll('&ndash;', '-')
      .replaceAll(/\u00A0/g, ' ')
      .replaceAll('&laquo;','«')
      .replaceAll('&raquo;','»')
      .replaceAll('&deg;', '°')
      .replaceAll('&ordm;', 'º')
      .replaceAll('\n', '')
      ;
}

export  function parseHTMLToSequentialObjects(htmlString) {
    const result = [];
    const stack = []; // Для отслеживания вложенности
    // console.log('htmlString', htmlString);
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
          // text = text.trim();
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
    // console.log('parser', JSON.stringify(result));
    return result;
  }
