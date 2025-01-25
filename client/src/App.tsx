import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Calculator from "@/pages/calculator";
import Games from "@/pages/games";
import Runner from "@/pages/games/runner";
import Tetris from "@/pages/games/tetris";
import MemoryMatch from "@/pages/games/memory-match";
import PuzzleSlide from "@/pages/games/puzzle-slide";
import WordScramble from "@/pages/games/word-scramble";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/games" component={Games} />
      <Route path="/games/runner" component={Runner} />
      <Route path="/games/tetris" component={Tetris} />
      <Route path="/games/memory-match" component={MemoryMatch} />
      <Route path="/games/puzzle-slide" component={PuzzleSlide} />
      <Route path="/games/word-scramble" component={WordScramble} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;