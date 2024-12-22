export function stripHtmlTags(htmlString: string) {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, '').replace(/\u00A0/g, ' ').replace('&nbsp;', ' ');
}
