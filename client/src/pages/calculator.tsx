import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-4">
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <input
            type="text"
            className="w-full text-right text-2xl bg-transparent outline-none"
            readOnly
            value="0"
          />
        </div>

        <div className="grid grid-cols-5 gap-1">
          {calculatorButtons.map((row, rowIndex) => (
            row.map((btn, btnIndex) => (
              <Button
                key={`${rowIndex}-${btnIndex}`}
                variant={btn === "=" ? "default" : "outline"}
                className={`h-14 text-lg ${btn === "=" ? "bg-blue-500 hover:bg-blue-600" : "bg-white hover:bg-gray-50"}`}
              >
                {btn}
              </Button>
            ))
          ))}
        </div>

        <div className="mt-8">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setLocation("/chat")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}