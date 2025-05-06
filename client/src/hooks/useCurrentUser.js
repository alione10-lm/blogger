import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../utils/api";

const useCurrentUser = () => {
  const { data: currentUser, isLoading: isGettingCurrentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return { currentUser, isGettingCurrentUser };
};

export default useCurrentUser;
