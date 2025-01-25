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
import { Menu, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
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
            <a
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                location === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
      {location === "/chat" && onClearChat && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm text-muted-foreground hover:text-destructive"
            onClick={onClearChat}
          >
            <Trash2 className="mr-2 size-4" />
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
            className="md:hidden fixed top-4 left-4"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Do my work</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col border-r">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">Do my work</h1>
        </div>
        <div className="flex-1 px-2 py-4">
          <NavLinks />
        </div>
      </div>
    </>
  );
}