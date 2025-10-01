'use client'
import React, { useState, useRef, useContext } from "react";
import ProfileDetails from "./ProfileDetails";
import { AuthContext, useAuth } from "@/app/context/AuthContext";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';

const ProfileLetter = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Topbar must be used within an AuthProvider");
  }
  const { user } = useAuth();
  const { logout } = authContext;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const letterRef = useRef<HTMLDivElement>(null);

  const handleLetterClick = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        setModalPosition({
          top: rect.bottom + 5 + window.scrollY,
          left: rect.right - 200 + window.scrollX,
        });
      }
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      handleCloseModal()
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const username = user?.username || "User";
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <>
      <div
        ref={letterRef}
        className="h-8 w-8 flex items-center justify-center bg-accent text-white rounded-full cursor-pointer text-lg font-bold"
        onClick={handleLetterClick}
      >
        {firstLetter}
      </div>

      <ProfileDetails
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        position={modalPosition}
      >
        <div className="flex items-center justify-start">
          <div className="mr-3 h-8 w-8 flex items-center justify-center bg-accent text-white rounded-full text-lg font-bold">
            {firstLetter}
          </div>
          <h2 className="text-lg font-semibold">{username}</h2>
        </div>
        <hr className="my-2 text-black" />
        <div className="flex justify-start items-center">
          <button
            onClick={handleLogOut}
            className="flex items-center w-full my-3"
          >
            <LogOut className="text-destructive h-5 w-5 mr-1" /> Logout
          </button>
        </div>
      </ProfileDetails>
    </>
  );
};

export default ProfileLetter;
