"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "/about", type: "link" },
    { name: "Services", href: "/services", type: "link" },
    { name: "Projects", href: "/projects", type: "link" },
    { name: "Contact", href: "/contact", type: "link" },
  ];

  const scrollToSection = (href: string) => {
    // If it's a page link (starts with '/'), navigate to that page
    if (href.startsWith("/")) {
      router.push(href);
      setIsOpen(false);
      return;
    }

    // If it's an anchor link (starts with '#'), scroll to that section
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
      return;
    }

    // Default case - treat as anchor if no prefix
    const element = document.querySelector(`#${href}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const isLinkActive = (href: string) => {
    // For page links, check if the current pathname matches
    if (href.startsWith("/")) {
      return pathname === href;
    }
    // For anchor links, use the activeSection logic
    return activeSection === href.slice(1);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow"
          : "bg-transparent shadow"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/FirstClass_Logo.png"
                alt="FirstClass_Logo"
                width={150}
                height={100}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`transition-colors font-medium relative ${
                  isLinkActive(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
                {isLinkActive(link.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
            <ModeToggle />
            <div>
              <Button
                onClick={() => scrollToSection("#contact")}
                className="gap-2"
              >
                <Phone className="h-4 w-4" />
                0861 125 277
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col h-full">
                  {/* Header */}
                  <Image
                    src="/FirstClass_Logo.png"
                    alt="FirstClass_Logo"
                    width={150}
                    height={100}
                    className="mb-8 mt-6"
                  />

                  {/* Navigation Links */}
                  <div className="flex flex-col space-y-1 flex-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className={`text-left px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                          isLinkActive(link.href)
                            ? "text-primary bg-primary/10"
                            : "text-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <div className="pt-6 mt-auto border-t">
                    <Button
                      onClick={() => scrollToSection("#contact")}
                      className="gap-2 w-full"
                      size="lg"
                    >
                      <Phone className="h-4 w-4" />
                      0861 125 277
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

// uwPIN33RFYZXkffk
