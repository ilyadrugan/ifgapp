export function stripHtmlTags(htmlString: string) {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, '')
        .replaceAll('&nbsp;', ' ')
        .replace(/\u00A0/g, ' ')
        ;
}
