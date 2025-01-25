import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Calculator() {
  const [_, setLocation] = useLocation();

  const calculatorButtons = [
    ["sin", "cos", "tan", "(", ")"],
    ["7", "8", "9", "÷", "AC"],
    ["4", "5", "6", "×", "√"],
    ["1", "2", "3", "-", "^"],
    ["0", ".", "=", "+", "←"]
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Scientific Calculator Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-gray-500 hover:text-gray-900 px-3 py-2 cursor-pointer">Features</span>
              <span className="text-gray-500 hover:text-gray-900 px-3 py-2 cursor-pointer">Tutorials</span>
              <span className="text-gray-500 hover:text-gray-900 px-3 py-2 cursor-pointer">Download</span>
              <span className="text-gray-500 hover:text-gray-900 px-3 py-2 cursor-pointer">Support</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Calculator Display */}
          <div className="p-4 bg-gray-50 border-b">
            <input
              type="text"
              className="w-full text-right text-2xl bg-transparent outline-none"
              readOnly
              value="0"
            />
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-5 gap-1 p-2 bg-white">
            {calculatorButtons.map((row, rowIndex) => (
              row.map((btn, btnIndex) => (
                <Button
                  key={`${rowIndex}-${btnIndex}`}
                  variant={btn === "=" ? "default" : "outline"}
                  className={`h-12 text-sm ${btn === "=" ? "bg-blue-500 hover:bg-blue-600" : "bg-white hover:bg-gray-50"}`}
                >
                  {btn}
                </Button>
              ))
            ))}
          </div>
        </div>

        {/* Discreet Back Button */}
        <div 
          onClick={() => setLocation("/chat")}
          className="mt-8 text-center text-xs text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          Version 2.5.1
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <div className="mt-4 space-y-4">
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Download</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Features</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Security</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <div className="mt-4 space-y-4">
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Documentation</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Guides</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">API Status</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <div className="mt-4 space-y-4">
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">About</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Blog</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Careers</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <div className="mt-4 space-y-4">
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Privacy</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">Terms</span>
                <span className="text-gray-500 hover:text-gray-900 block cursor-pointer">License</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-400">&copy; 2025 Scientific Calculator Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}