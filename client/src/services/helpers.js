import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const TimeFromNow = (date) => {
  return dayjs(date).fromNow();
};

export const checkIfTheUserHasLikedTheBlog = (userId, likes) => {
  const isLiked = likes.some((like) => like.userId === userId);

  return isLiked;
};
export const formatBirthDay = (d) => {
  const date = dayjs(d);
  const formatted = date.locale("fr").format("DD MMM YYYY"); // "12 janv. 2005"

  const displayDate = formatted.replace(".", "");
  return displayDate;
};
