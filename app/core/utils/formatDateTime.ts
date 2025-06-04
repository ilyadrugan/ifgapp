import moment from 'moment';
import 'moment/locale/ru';
export function formatDateWithMoment(dateTimeStr: string, timeZoneOffset: string) {
    return moment(dateTimeStr)
      .utcOffset(timeZoneOffset)
      .locale('ru')
      .format('D MMMM');
  }
export function formatTimeWithMoment(dateTimeStr: string, timeZoneOffset: string) {
    return moment(dateTimeStr)
      .utcOffset(timeZoneOffset)
      .locale('ru')
      .format('HH:mm');
  }

export function formatDateWithParamsMoment(dateTimeStr: string, timeZoneOffset: string, format: string) {
    return moment(dateTimeStr)
      .utcOffset(timeZoneOffset)
      .locale('ru')
      .format(format);
  }

//YYYY-MM-DD
export function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    return [year, month, day].join('-');
}

export function formatCertDate(date: string) {
  const [datePart, timePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
