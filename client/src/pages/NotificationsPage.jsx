import React, { useEffect } from "react";
import Notifications from "../components/Notifications";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
const NotificationsPage = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const read = async () => {
      const res = await axios.get("/api/notifications/read-all");
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
    };
    read();
  }, [queryClient]);

  return (
    <div className="w-full p-2 md:p-0">
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
