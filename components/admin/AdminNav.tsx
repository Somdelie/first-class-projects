import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ui/ModeToggle";
import { UserButton } from "@clerk/nextjs";

const AdminNav = () => {
  return (
    <div className="container mx-auto px-4 border-b sticky top-0 bg-background z-50">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/FirstClass_Logo.png"
              alt="FirstClass_Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
