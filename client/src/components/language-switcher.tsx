import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useI18n();
  const nextLanguageLabel = language === 'en' ? 'العربية' : 'English';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={`Switch language to ${nextLanguageLabel}`}
      title={`Switch language to ${nextLanguageLabel}`}
      className={`flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 ${
        isRTL ? 'flex-row-reverse' : ''
      }`}
      data-testid="language-switcher"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {nextLanguageLabel}
      </span>
    </Button>
  );
}
