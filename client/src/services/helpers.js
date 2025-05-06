import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const TimeFromNow = (date) => {
  return dayjs(date).fromNow();
};

export const checkIfTheUserHasLikedTheBlog = (userId, likes) => {
  const x = likes.some((like) => like.userId === userId);
  console.log(x);
  return x;
};
