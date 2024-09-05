import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import AvatarIcon from "@/public/icons/avatar.svg";
import UserAvatar from "@/public/icons/avatar.svg";
import { UserButton } from "@clerk/nextjs";

export default function UserProfile() {
  const { user } = useUser();

  const UserData = {
    fullName: user?.fullName,
    email: user?.primaryEmailAddress.emailAddress,
    imageUrl: user?.hasImage ? user.imageUrl : UserAvatar,
  };

  // localStorage.setItem("User", JSON.stringify(UserData));
  return (
    <button className="flex items-center space-x-2">
      <span className="text-base font-medium hidden md:block text-gray-700">
        {UserData?.fullName}
      </span>
      <UserButton className="mr-0 md:mr-4" />
    </button>
  );
}
