import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Topbar: React.FC = () => {
  return (
    <nav className="bg-primary p-3 flex text-white justify-between items-center w-full">
      <div className="flex items-center">
        {/* Icon with size and margin */}
        <Link className="text-md" href="/">
          Savis
        </Link>
      </div>
      <div className="space-x-4">
        <Button className="bg-primary" variant="outline">
          <Link className="text-md" href="/login">
            Login
          </Link>
        </Button>
        <Button className="bg-white text-black" variant='secondary'>
          <Link className="text-md" href="/signup">
            Get Started
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Topbar;
