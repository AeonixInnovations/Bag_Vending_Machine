import { prefixCharacterAddition } from "./prefixCharacterAddition.service";

export const formateMongoDateService = (date: string): string => {
  const splitDate = date.split("-");
  const year = splitDate[0];
  let month = splitDate[1];
  let day = splitDate[2];

  if (Number(month) < 10 && !month.startsWith("0")) month = "0" + month;

  if (Number(day) < 10 && !day.startsWith("0")) day = "0" + day;

  const revisedDate = year + "-" + month + "-" + day;
  return revisedDate;
};

export const formateMongoDateNotificationService = (date: string): string => {
  const splitDate = date.split("-");
  const year = splitDate[0];
  let month = splitDate[1];
  let day = splitDate[2];

  if (Number(month) < 10 && !month.startsWith("0")) month = "0" + month;

  if (Number(day) < 10 && !day.startsWith("0")) day = "0" + day;

  const revisedDate = month + "-" + day + "-" + year;
  return revisedDate;
};

export const getCurrentMongoDBFormattedDate = () => {
  const date: string | Date = new Date();
  const formattedDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return formateMongoDateService(formattedDate);
};

export const manualDateComparator = (
  _date1: string,
  _date2: string
): number => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const firstDate =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  const secondDate =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

  if (new Date(firstDate).getTime() > new Date(secondDate).getTime()) return 1;
  else if (new Date(firstDate).getTime() < new Date(secondDate).getTime())
    return -1;
  else return 0;
};

export const getMongoDBFormattedFirstOfNextMonth = (): string => {
  const date = new Date();
  const newDate = new Date();
  console.log("First of Next Month", newDate);
  newDate.setMonth(newDate.getMonth() + 3); //change date
  console.log("newdate", newDate);
  const formattedDate =
    newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + 1;
  console.log("newdate", formattedDate);
  return formateMongoDateService(formattedDate);
};

export const addMinutesToDate = (date: number, minutes: number): number =>
  date + minutes * 60000;

export const compareDate = (date1: Date, date2: Date): boolean => {
  if (date1 > date2) {
    return true;
  } else if (date1 === date2) {
    return false;
  } else {
    return false;
  }
};

export const formatDate = (date: Date | string): string => {
  const _date = new Date(date);
  if (String(_date).toLowerCase() == "invalid date") return "Invalid date";

  const MM =
    String(_date.getMonth() + 1).length == 1
      ? "0" + String(_date.getMonth() + 1)
      : String(_date.getMonth() + 1);
  const DD =
    String(_date.getDate()).length == 1
      ? "0" + _date.getDate()
      : String(_date.getDate());
  const YY = _date.getFullYear();

  return MM + "/" + DD + "/" + YY;
};

export const isTermDateMoreThanNintyDays = (date: Date | string): boolean => {
  //   days hours min  sec  mili-sec
  // Here logic is eight days after the term, but ninth day is taken as getTime() value comparison gives different result for DB date and Mui Date
  const nintyDaysInMs = 91 * 24 * 60 * 60 * 1000; //Ninty Days in Mili Seconds
  const givenDate = new Date(date).getTime();
  const timeStampNintyDaysAgo = new Date().getTime() - nintyDaysInMs;

  if (givenDate < timeStampNintyDaysAgo) return true;

  return false;
};

export const dateDifference = (
  date1: Date | string | number,
  date2: Date | string | number = new Date().getTime()
): number => {
  date1 = new Date(date1 as string).getTime();
  date2 = new Date(date2 as string).getTime();
  const differenceInTime: number = ((date2 as number) -
    date1) as number as number;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};

export const formatDateAsPayload = (date: Date | string): string => {
  const _date = new Date(date);
  if (String(_date).toLowerCase() == "invalid date") return "Invalid date";

  const MM =
    String(_date.getMonth() + 1).length == 1
      ? "0" + String(_date.getMonth() + 1)
      : String(_date.getMonth() + 1);
  const DD =
    String(_date.getDate()).length == 1
      ? "0" + _date.getDate()
      : String(_date.getDate());
  const YY = _date.getFullYear();

  return YY + "-" + MM + "-" + DD;
};

export const calculateAge = (
  birthDate: string,
  otherDate: string | Date
): number => {
  console.log("birthDate", birthDate);
  console.log("otherDate", otherDate);
  const _birthDate = new Date(birthDate);
  const _otherDate = new Date(otherDate);

  let years = _otherDate.getFullYear() - _birthDate.getFullYear();

  if (
    _otherDate.getMonth() < _birthDate.getMonth() ||
    (_otherDate.getMonth() == _birthDate.getMonth() &&
      _otherDate.getDate() < _birthDate.getDate())
  ) {
    years--;
  }

  console.log("Age", years);
  return years;
};

export const getAgeInDays = (dateOfBirth: string) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(dateOfBirth);
  const secondDate = new Date();

  const diffDays = Math.round(
    Math.abs(
      ((firstDate as unknown as number) - (secondDate as unknown as number)) /
        oneDay
    )
  );
  return diffDays;
};

export const calculateAgeGroup = function (age: number) {
  if (age >= 18 && age <= 39) {
    return "18-39";
  } else if (age >= 40 && age <= 59) {
    return "40-59";
  } else if (age >= 60 && age <= 64) {
    return "60-64";
  } else return "65+";
};

export const getFormattedMongoDBDateEmailService = (_date: string) => {
  const date: string | Date = new Date(_date);
  const formattedDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return formateMongoDateNotificationService(formattedDate);
};

export const getFormattedMongoDBDateServiceForDBComparison = (
  _date: string
) => {
  const date: string | Date = new Date(_date);
  const formattedDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return formateMongoDateService(formattedDate);
};

export const formattedUIDateConvertorService = (_date: string) => {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = prefixCharacterAddition(date.getMonth() + 1);
  const day = prefixCharacterAddition(date.getDate());

  const revisedDate = month + "-" + day + "-" + year;
  return revisedDate;
};

export const dateTimeZoneConverter = (_date: string): Date | string => {
  let timeZoneFormattedDate: Date;
  const date = new Date(_date);

  const userTimeZoneOffset = date.getTimezoneOffset() * 60000; // Converting the TimezoneOffset() to milliseconds

  if (userTimeZoneOffset >= 0)
    timeZoneFormattedDate = new Date(date.getTime() + userTimeZoneOffset);
  else timeZoneFormattedDate = new Date(date.getTime() - userTimeZoneOffset);

  return UIFormattedDate(timeZoneFormattedDate);
};

export const UIFormattedDate = (date: Date): string => {
  const formattedDate =
    prefixCharacterAddition(date.getMonth() + 1) +
    "-" +
    prefixCharacterAddition(date.getDate()) +
    "-" +
    date.getFullYear();

  return formattedDate;
};

export const ExcelDateToYYYYMMDD = (serial: number | string): string | Date => {
  // let date = serial;
  // console.log("first", date);
  // if (serial.toString().length > 6) date = new Date(Math.round(((serial as number) - 25569) * 86400 * 1000));
  // else date = new Date(date);
  if (serial.toString().length > 7) {
    const tDate = new Date(serial);
    const _date =
      tDate.getFullYear() +
      "-" +
      (tDate.getMonth() + 1) +
      "-" +
      tDate.getDate();
    return formateMongoDateService(_date);
  } else {
    const utc_days = Math.floor((serial as number) - 25569);
    const utc_value = utc_days * 86400;
    const date = new Date(utc_value * 1000);

    const _date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formateMongoDateService(_date);
  }
};

export const formatExcelDateToYYYYMMDD = (date: string): string => {
  const splitDate = date.split("/");
  const year = splitDate[2];
  let month = splitDate[0];
  let day = splitDate[1];

  if (Number(month) < 10 && !month.startsWith("0")) month = "0" + month;

  if (Number(day) < 10 && !day.startsWith("0")) day = "0" + day;

  const revisedDate = year + "-" + month + "-" + day;
  return revisedDate;
};

export const date = {
  formateMongoDateService,
  getCurrentMongoDBFormattedDate,
};

export const getStartOfToday = (): Date => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T00:00:00`.split("T")[0]);
};

// Helper function to get the start of the month
export const getStartOfMonth = (): Date => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  return new Date(`${year}-${month}-01T00:00:00`.split("T")[0]);
};

export const getStartOfWeek = (): Date => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const distanceToMonday = (dayOfWeek + 6) % 7; // calculate the number of days back to the last Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMonday);
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(monday.getDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T00:00:00`.split("T")[0]);
};

// formateMongoDateService(date.toISOString().split("T")[0]);
