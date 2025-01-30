import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="container mx-auto px-4 py-6 relative flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          Decision Buddy
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {navigation.filter(item => item.href !== "/").map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className="text-yellow-200 hover:text-yellow-400 hover:bg-yellow-500/10"
            >
              {item.name}
            </Button>
          </Link>
        ))}
        <Link href="/chat">
          <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 rounded-xl ml-2">
            Start Chat
          </Button>
        </Link>
      </div>
    </nav>
  );
}