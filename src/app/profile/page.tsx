"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Profile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.ok) {
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleData = async () => {
    try {
      const res = await fetch("/api/auth/profile");
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.ok) {
        setUserId(data.data._id);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen border">
      <button className="p-2 bg-red-600 text-[18px] m-5" onClick={handleLogout}>
        Logout
      </button>
      <button className="p-2 bg-green-600 text-[18px] m-5" onClick={handleData}>
        click me to show user id:
        {userId && <p>{userId}</p>}
      </button>
    </div>
  );
};

export default Profile;
