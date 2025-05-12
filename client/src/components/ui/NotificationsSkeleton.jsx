const NotificationSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex w-full items-start gap-3 p-4 rounded-lg bg-gray "
        >
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mt-1"></div>
          <div className="flex-1 space-y-2 w-full">
            <div className="w-1/4 h-4 bg-gray-200 rounded dark:bg-gray-700 "></div>
            <div className="md:w-2/4  h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="md:w-1/3 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
