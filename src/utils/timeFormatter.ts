export const timeFormatter = (time: string | number, locale: string): string => {
  const intl = new Intl.DateTimeFormat(locale);
  const inputTime = new Date(time);

  if (isNaN(inputTime.getTime())) {
    throw new Error(`Invalid date string : '${time}'`);
  }

  return intl.format(inputTime);
};
