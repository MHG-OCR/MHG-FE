export default class DateHelper {
  static JSDateToDateTime(date: Date) {
    return date.toJSON();
  }
  static stringToDate = (date : string) => {
    return new Date(date)
  }
  static DateTimeToDateUTCString = (date: Date | string) => {
    if (typeof date == 'string') {
      return new Date(date).toUTCString();
    }
    return date.toUTCString();
  };
  static months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  static beautifyStringDate = (args : string) => args.substring(0,args.indexOf("T"));
}
