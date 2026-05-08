import { Link } from "wouter";
import { Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logo from "@assets/WhatsApp_Image_2025-07-29_at_1.36.21_PM-removebg-preview_1754275542619.png";

export default function Footer() {
  const { t, isRTL } = useI18n();

  return (
    <footer className="bg-gradient-to-br from-foreground via-muted to-foreground text-white dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950" data-testid="footer">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`} data-testid="footer-logo">
              <img 
                src={logo} 
                alt="ELIZDEHAR Inc." 
                className={`h-16 w-16 object-contain ${isRTL ? 'ml-4' : 'mr-4'}`}
              />
              <div className="text-2xl font-bold text-white">El izdihar Inc.</div>
            </div>
            <p className={`text-white/80 mb-8 max-w-md leading-relaxed text-lg ${isRTL ? 'text-right' : 'text-left'}`} data-testid="footer-description">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t('footer.services')}</h4>
            <ul className="space-y-2 text-left text-white/75">
              <li>
                <Link href="/shoes-factory" className="hover:text-white transition-colors">
                  {t('footer.services.shoes')}
                </Link>
              </li>
              <li>
                <Link href="/import-export" className="hover:text-white transition-colors">
                  {t('footer.services.import')}
                </Link>
              </li>
              <li>
                <Link href="/agriculture" className="hover:text-white transition-colors">
                  {t('footer.services.agriculture')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('footer.services.consulting')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t('footer.company')}</h4>
            <ul className="space-y-2 text-left text-white/75">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('footer.company.about')}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  {t('footer.company.team')}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {t('footer.company.careers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('footer.company.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p data-testid="footer-copyright" className="text-[#d3dbe0]">
            &copy; 2024 ELIZDEHAR Inc. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
