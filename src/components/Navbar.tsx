import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Shield, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Deep Guard AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/ai" className="text-foreground hover:text-primary transition-colors">
              AI
            </Link>
            {user && (
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
            <Link to="/support" className="text-foreground hover:text-primary transition-colors">
              Support
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            {user ? (
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate("/auth")} variant="outline">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/ai" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              AI
            </Link>
            {user && (
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link to="/support" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Support
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              {user ? (
                <Button onClick={handleSignOut} variant="outline" className="flex-1">
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate("/auth")} variant="outline" className="flex-1">
                    Sign In
                  </Button>
                  <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 flex-1">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}