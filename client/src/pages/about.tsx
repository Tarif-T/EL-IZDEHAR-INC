import Stats from "@/components/sections/stats";
import { useI18n } from "@/lib/i18n";

import Untitled_design__3_ from "@assets/Untitled design (3).png";

export default function About() {
  const { t, isRTL } = useI18n();
  return (
    <div className="pt-16" data-testid="about-page">
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold text-slate-900 mb-6 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.title')}</h1>
            <h2 className={`text-2xl md:text-3xl text-primary mb-8 ${isRTL ? 'arabic-subtitle' : ''}`}>{t('about.subtitle')}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src={Untitled_design__3_}
                alt="Mr. Tag Elsir Abd Elrahman Abdullah - Founder"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                data-testid="founder-image"
              />
            </div>
            <div className="space-y-6">
              <p className={`text-lg text-slate-700 leading-relaxed ${isRTL ? 'arabic-body' : ''}`}>
                {t('about.founder.bio1')}
              </p>
              <p className={`text-lg text-slate-700 leading-relaxed ${isRTL ? 'arabic-body' : ''}`}>
                {t('about.founder.bio2')}
              </p>
              <div className={`bg-slate-50 p-6 rounded-xl ${isRTL ? 'border-r-4 border-primary' : 'border-l-4 border-primary'}`}>
                <p className={`text-xl italic text-slate-800 mb-4 ${isRTL ? 'arabic-body' : ''}`} data-testid="founder-quote">
                  "{t('about.founder.quote')}"
                </p>
                <p className={`text-primary font-semibold ${isRTL ? 'arabic-text' : ''}`}>{t('about.founder.attribution')}</p>
              </div>
            </div>
          </div>

          <Stats />

          {/* Additional History Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Journey</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">1975-2000</h4>
                  <p className="text-slate-600">Banking sector leadership and economic foundation building</p>
                </div>
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">1992</h4>
                  <p className="text-slate-600">Founded El-izdihar Plastic Shoe Factory</p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">2000s</h4>
                  <p className="text-slate-600">Expansion into import/export and agriculture</p>
                </div>
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Today</h4>
                  <p className="text-slate-600">Over 300 employees across three major divisions</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                At ELIZDEHAR Inc., we are committed to creating sustainable economic opportunities that empower communities and strengthen local economies. Our three-pillar approach encompasses innovative manufacturing, responsible agriculture, and strategic international trade.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Core Values</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Excellence in quality and craftsmanship</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sustainable and ethical business practices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Community empowerment and job creation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Innovation and continuous improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
