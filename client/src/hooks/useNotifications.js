import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserNotification, readAllNotifications } from "../utils/api";

const useNotifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotification,
  });

  const { mutate: readNotifications } = useMutation({
    mutationFn: readAllNotifications,
  });

  const lastCheck = localStorage.getItem("last-check");
  // console.log(lastCheck);
  // notifications?.forEach((element) => {
  //   console.log(new Date(element.createdAt).getTime());
  // });

  const x = notifications?.some(
    (el) => new Date(el.createdAt).getTime() > lastCheck
  );

  console.log(x);

  const isAllRed = notifications?.some((el) => el.isRead === true);

  return {
    notifications,
    isLoading,
    error,
    isAllRed,
    readNotifications,
  };
};

export default useNotifications;
