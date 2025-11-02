"use client";
import Image from "next/image";
import { ModeToggle } from "./ui/ModeToggle";
import { AdminAuthButton } from "./AdminAuthButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
const navMenu = [
  { name: "Home", section: "home" },
  { name: "About", section: "about" },
  { name: "Application Partners", section: "application-partners" },
  { name: "Projects", section: "projects" },
  { name: "Services", section: "services" },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  return (
    <div className="flex items-center justify-between sticky top-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow z-50 h-16">
      <div className="px-4 md:px-10">
        <Image
          src="/FirstClass_Logo.png"
          alt="FirstClass_Logo"
          width={150}
          height={100}
        />
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-2 bg-sky-950 h-full text-white rounded-tl-full px-8">
        <ul className="flex space-x-4">
          {navMenu.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => scrollToSection(item.section)}
                className="bg-transparent border-none cursor-pointer text-inherit px-2 py-1 font-semibold relative transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow hover:bg-linear-to-br hover:from-green-400 hover:rounded-full hover:to-teal-400 hover:text-white active:scale-95 active:translate-y-0 active:shadow"
                style={{ perspective: "400px", transformStyle: "preserve-3d" }}
              >
                <span
                  className="block transition-transform duration-200"
                  style={{ transform: "translateZ(0)" }}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 ml-4">
          <ModeToggle />
          <AdminAuthButton />
        </div>
      </nav>
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="p-2 rounded text-white shadow bg-blue-950">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <ul className="flex flex-col space-y-4 mt-4">
                  {navMenu.map((item) => (
                    <li key={item.name}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.section)}
                        className="w-full text-left px-4 py-2 font-semibold transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-linear-to-br hover:from-blue-400 hover:to-teal-400 hover:text-white active:scale-95 active:translate-y-0 active:shadow-md"
                        style={{
                          perspective: "400px",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <span
                          className="block transition-transform duration-200"
                          style={{ transform: "translateZ(0)" }}
                        >
                          {item.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-4">
                  <ModeToggle />
                  <AdminAuthButton />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
