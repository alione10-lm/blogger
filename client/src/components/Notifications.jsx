import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserNotification } from "../utils/api";
import NotificationItem from "./NotificationItem";
import NotificationSkeleton from "./ui/NotificationsSkeleton";
import { Menus } from "./ui/Menu2";
import { EllipsisVertical } from "lucide-react";

const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotification,
  });

  // const handleNotify = (notifBody) => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       const notification = new Notification("Salam Oussama!", {
  //         body: notifBody,
  //         icon: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png",
  //       });

  //       notification.onclick = () => {
  //         window.open("https://google.com");
  //       };
  //     } else {
  //       alert("Notification permission denied");
  //     }
  //   });
  // };

  // notifications?.forEach((notif) => {
  //   notif.isRead ? "" : handleNotify();
  // });
  if (error) return <p>{error.message}</p>;
  return (
    <div className="w-full  min-h-[100%] ">
      <h1 className="md:text-2xl text-lg font-bold mb-6 dark:text-gray-300 text-gray-700">
        Notifications
      </h1>
      {isLoading ? (
        <NotificationSkeleton />
      ) : (
        <div className="md:space-y-4 space-y-2">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              id={notif._id}
              content={notif.content}
              createdAt={notif.createdAt}
              link={notif.link}
              type={notif.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

// export default NotificationSkeleton;
