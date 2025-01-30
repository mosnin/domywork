import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-yellow-500/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">About Us</h3>
            <p className="text-yellow-200/60 text-sm">
              Decision Buddy - Your AI-powered companion for making better decisions.
            </p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs">
                  <a className="text-yellow-200/60 hover:text-yellow-400">Documentation</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-yellow-200/60 hover:text-yellow-400">Resources</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms">
                  <a className="text-yellow-200/60 hover:text-yellow-400">Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-yellow-200/60 hover:text-yellow-400">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/ai-disclaimer">
                  <a className="text-yellow-200/60 hover:text-yellow-400">AI Disclaimer</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-yellow-200/50 text-sm border-t border-yellow-500/20 pt-8">
          <p>&copy; 2025 Decision Buddy - Your AI Decision Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
