"use client";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar: React.FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error("Topbar must be used within an AuthProvider");
  }  
  const { loading, logout } = authContext

  const handleLogOut = async () => {
   
    try {
      await logout()
      router.push("/") 
    } catch (error) {
      console.error("Login failed:", error)
    }
  };

  return (
    <nav className="bg-primary text-white p-3 flex justify-between items-center w-full">
      <div className="flex items-center">
        <DollarSign className="h-5 w-5 mr-2" />
        <Link className="text-md" href="/dashboard">
          Finance
        </Link>
      </div>
      <div className="space-x-4">
        <Button variant="secondary" onClick={handleLogOut} disabled={loading}>
          {loading ? "Logging Out..." : "Log Out"}
        </Button>
      </div>
    </nav>
  );
};

export default Topbar;