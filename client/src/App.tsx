import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Calculator from "@/pages/calculator";
import Games from "@/pages/games";
import Runner from "@/pages/games/runner";
import Snake from "@/pages/games/snake";
import Tetris from "@/pages/games/tetris";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/games" component={Games} />
      <Route path="/games/runner" component={Runner} />
      <Route path="/games/snake" component={Snake} />
      <Route path="/games/tetris" component={Tetris} />
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