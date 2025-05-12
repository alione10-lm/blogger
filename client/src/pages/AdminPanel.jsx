import { useQuery } from "@tanstack/react-query";

import { getUserNotification } from "../utils/api";
import FullSpinner from "../components/ui/FullSpinner";
const AdminPanel = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotification,
  });

  if (isLoading) return <FullSpinner />;

  console.log(notifications);
  return <div>{/* <SearchWindow /> */}</div>;
};

export default AdminPanel;
