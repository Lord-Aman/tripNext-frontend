import { useUser } from "@clerk/nextjs";

const useUserData = () => {
  const { user } = useUser();

  const userData = {
    fullName: user?.fullName || "Unknown User",
    userId: user?.primaryEmailAddress?.emailAddress,
  };

  return userData;
};

export default useUserData;
