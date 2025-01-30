import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <div className="flex flex-col sm:flex-row gap-2">
      {navigation.filter(item => item.href !== "/").map((item) => (
        <Link key={item.name} href={item.href}>
          <Button
            variant="ghost"
            className="w-full text-yellow-200 hover:text-yellow-400 hover:bg-yellow-500/10"
            onClick={() => setOpen(false)}
          >
            {item.name}
          </Button>
        </Link>
      ))}
      <Link href="/chat">
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl"
          onClick={() => setOpen(false)}
        >
          Start Chat
        </Button>
      </Link>
    </div>
  );

  return (
    <nav className="container mx-auto px-4 py-6 relative flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          Good Choices
        </h1>
      </Link>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden bg-gray-900/50 backdrop-blur-sm hover:bg-yellow-500/10 text-yellow-400"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-64 bg-gray-900 border-yellow-500/20 p-0"
        >
          <SheetHeader className="px-4 py-4 border-b border-yellow-500/20">
            <SheetTitle className="text-yellow-400">Good Choices</SheetTitle>
          </SheetHeader>
          <div className="px-4 py-6 flex flex-col gap-4">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center gap-4">
        <NavLinks />
      </div>
    </nav>
  );
}