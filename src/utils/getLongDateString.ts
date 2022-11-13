import type {LocaleConfigType} from '$types';

export function getLongDateString(locale: LocaleConfigType, date: Date) {
  return new Intl.DateTimeFormat(locale as unknown as string, {dateStyle: 'long'}).format(date);
}
