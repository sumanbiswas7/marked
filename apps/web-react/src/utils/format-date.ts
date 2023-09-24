import moment from "moment";

export function getFormattedDate(date: string, format: Format) {
   const momentDate = moment(date);
   return momentDate.format(format);
}

type Format = "Do MMM";
