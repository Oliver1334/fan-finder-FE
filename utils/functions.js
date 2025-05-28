import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat  from "dayjs/plugin/localizedFormat"

export const relativeTimeAndDate = (created_at) => {
  dayjs.extend(relativeTime);
  return dayjs(created_at).fromNow();
};


export const convertToFriendlyDate = (date) => {
  dayjs.extend(localizedFormat)
  return dayjs(date).format('ddd D MMM');
};