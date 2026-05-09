import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme/theme-toggle";
import logo from "@assets/WhatsApp_Image_2025-07-29_at_1.36.21_PM-removebg-preview_1754275542619.png";

const getNavigationItems = (t: (key: string) => string) => [
  { name: t('nav.home'), href: "/" },
  { name: t('nav.about'), href: "/about" },
  { name: t('nav.services'), href: "/services" },
  { name: t('nav.team'), href: "/team" },
  { name: t('nav.contact'), href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL } = useI18n();
  const navigationItems = getNavigationItems(t);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-effect shadow-2xl"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group" data-testid="logo-link">
            <img 
              src={logo} 
              alt="ELIZDEHAR Inc." 
              className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`hidden sm:block whitespace-nowrap font-bold text-foreground group-hover:text-primary transition-colors text-[20px] ${isRTL ? 'mr-3' : 'ml-3'}`}>El izdehar Inc.</div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 relative overflow-hidden group ${
                    location === item.href
                      ? "text-white bg-primary shadow-lg scale-105"
                      : "text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
                  }`}
                  data-testid={`nav-link-${item.name.toLowerCase()}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Tablet Language Switcher (visible on tablet but hidden on mobile) */}
          <div className={`hidden sm:flex lg:hidden items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden card-3d hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                data-testid="mobile-menu-trigger"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass-effect border-l border-primary/20">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate the website, switch color theme, or change language.
              </SheetDescription>
              <div className="flex flex-col space-y-4 mt-12">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group animate-slide-in-up ${
                      location === item.href
                        ? "text-white bg-primary shadow-lg"
                        : "text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                  >
                    <span className="relative z-10 font-medium">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                ))}
                
                {/* Language Switcher for Mobile */}
                <div className="mt-8 px-6 animate-slide-in-up" style={{ animationDelay: `${navigationItems.length * 0.1}s` }}>
                  <div className="border-t border-primary/20 pt-6 space-y-3">
                    <ThemeToggle showLabel />
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
