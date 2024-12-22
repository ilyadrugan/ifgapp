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
