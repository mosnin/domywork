import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Disguise Page", href: "/calculator" },
  { name: "Games", href: "/games" },
  { name: "Chat", href: "/chat" },
];

interface SidebarProps {
  onClearChat?: () => void;
}

export default function Sidebar({ onClearChat }: SidebarProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <nav className="space-y-1">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-sm font-medium",
                location === item.href
                  ? "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              )}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      {location === "/chat" && onClearChat && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
            onClick={() => {
              onClearChat();
              setOpen(false);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Clear Chat
          </Button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-64 bg-gray-900 border-gray-800 p-0"
        >
          <SheetHeader className="px-4 py-4 border-b border-gray-800">
            <SheetTitle className="text-white">Do my work</SheetTitle>
          </SheetHeader>
          <div className="px-2 py-4">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col bg-gray-900/50 backdrop-blur-sm border-r border-gray-800">
        <div className="flex h-14 items-center border-b border-gray-800 px-4">
          <h1 className="text-lg font-semibold text-white">Do my work</h1>
        </div>
        <div className="flex-1 px-2 py-4">
          <NavLinks />
        </div>
      </div>
    </>
  );
}