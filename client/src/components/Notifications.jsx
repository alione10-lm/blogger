import React from "react";
import { Bell, Info, CheckCircle, Heart, MessageCircle } from "lucide-react"; // optional: install lucide-react for icons
import { useQuery } from "@tanstack/react-query";
import { getUserNotification } from "../utils/api";
import NotificationItem from "./NotificationItem";
import NotificationSkeleton from "./ui/NotificationsSkeleton";

// const notifications = [
//   {
//     id: 1,
//     title: "New message from Sarah",
//     description: "Hey! Can we reschedule our meeting to tomorrow?",
//     time: "2 mins ago",
//     read: false,
//     icon: <Heart className="text-red-500" />,
//   },

//   {
//     id: 3,
//     title: "Reminder",
//     description: "Don’t forget your interview tomorrow at 10:00 AM.",
//     time: "3 hours ago",
//     read: false,
//     icon: <MessageCircle className="text-green-500" />,
//   },
// ];
const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotification,
  });

  return (
    <div className="w-full  min-h-[100%] p-4 md:p-0">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-300 text-gray-800">
        Notifications
      </h1>
      {isLoading ? (
        <NotificationSkeleton />
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              id={notif._id}
              content={notif.content}
              createdAt={notif.createdAt}
              link={notif.link}
            />
            // <div
            //   key={notif.id}
            //   className={`flex items-start gap-3 bg-gray-50/10 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-800 `}
            //   // ${
            //   //   notif.read
            //   //     ? "bg-white"
            //   //     : "bg-blue-50 border-l-4 border-blue-400"
            //   // }
            // >
            //   <div className="mt-1">{notif.icon}</div>
            //   <div className="flex-1">
            //     <h2 className="text-md font-semibold text-gray-800">
            //       {notif.title}
            //     </h2>
            //     <p className="text-sm text-gray-600">{notif.description}</p>
            //     <span className="text-xs text-gray-400">{notif.time}</span>
            //   </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

// export default NotificationSkeleton;
