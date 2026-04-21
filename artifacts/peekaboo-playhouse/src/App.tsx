import { Switch, Route } from "wouter";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import NavBar from "@/components/NavBar";
import Home from "@/pages/Home";
import Letters from "@/pages/Letters";
import Numbers from "@/pages/Numbers";
import Animals from "@/pages/Animals";
import Colors from "@/pages/Colors";
import Songs from "@/pages/Songs";
import Videos from "@/pages/Videos";
import Quiz from "@/pages/Quiz";
import Teacher from "@/pages/Teacher";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <LanguageProvider>
      <RewardsProvider>
        <div className="min-h-screen bg-[#FDF9F1]">
          <NavBar />
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/letters" component={Letters} />
              <Route path="/numbers" component={Numbers} />
              <Route path="/animals" component={Animals} />
              <Route path="/colors" component={Colors} />
              <Route path="/songs" component={Songs} />
              <Route path="/videos" component={Videos} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/teacher" component={Teacher} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <footer className="py-8 text-center text-sm text-slate-500 font-bold border-t border-slate-200 mt-12">
            🌟 Peekaboo Play House — Made with ❤️ for kids
          </footer>
        </div>
      </RewardsProvider>
    </LanguageProvider>
  );
}
