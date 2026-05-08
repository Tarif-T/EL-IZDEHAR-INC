import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import ServicesPreview from "@/components/sections/services-preview";
import TeamPreview from "@/components/sections/team-preview";
import founderImage from "@assets/Tagelsir (2)_1754274970758.jpg";
import { useI18n } from "@/lib/i18n";
import { AdvancedSEO } from "@/components/seo/AdvancedSEO";
import { organizationSchema, localBusinessSchema } from "@/utils/structuredData";

import Untitled_design__3_ from "@assets/Untitled design (3).png";

export default function Home() {
  const { t, isRTL } = useI18n();
  
  return (
    <div data-testid="home-page">
      <AdvancedSEO
        title="ELIZDEHAR Inc. - Premier Manufacturing & Export Company Sudan | Since 1990"
        description="Leading Sudanese manufacturer and global exporter since 1990. Premium footwear manufacturing, sustainable agriculture solutions, and international trade services. Based in Khartoum, serving worldwide markets with 30+ years of excellence."
        keywords={[
          "ELIZDEHAR Inc", "Sudan manufacturing", "Khartoum exports", "footwear manufacturer Sudan", 
          "agriculture Sudan", "import export Sudan", "Tag Elsir Abd Elrahman", "Sudanese companies",
          "plastic shoes factory", "El Izdehar Group", "Sudan trade", "African manufacturing",
          "sustainable agriculture Sudan", "international trade Khartoum", "Sudan business directory"
        ]}
        type="website"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop"
        structuredData={[organizationSchema, localBusinessSchema]}
        canonicalUrl={window.location.href}
        hreflangUrls={[
          { lang: "en", url: `${window.location.origin}/en` },
          { lang: "ar", url: `${window.location.origin}/ar` },
          { lang: "x-default", url: window.location.origin }
        ]}
      />
      <Hero />
      {/* About Section */}
      <section className="section-padding bg-white" data-testid="about-preview">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 mb-6 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.title')}</h2>
            <h3 className={`text-2xl md:text-3xl text-primary mb-8 ${isRTL ? 'arabic-subtitle' : ''}`}>{t('about.subtitle')}</h3>
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
        </div>
      </section>
      <ServicesPreview />
      <TeamPreview />
      {/* Value Propositions */}
      <section className="section-padding bg-slate-50" data-testid="value-propositions">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`bg-white p-8 rounded-2xl shadow-lg ${isRTL ? 'text-right' : 'text-center'}`} data-testid="value-time">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold text-slate-900 mb-2 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.values.time.title')}</h4>
              <p className={`text-slate-600 ${isRTL ? 'arabic-body' : ''}`}>{t('about.values.time.description')}</p>
            </div>

            <div className={`bg-white p-8 rounded-2xl shadow-lg ${isRTL ? 'text-right' : 'text-center'}`} data-testid="value-support">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold text-slate-900 mb-2 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.values.support.title')}</h4>
              <p className={`text-slate-600 ${isRTL ? 'arabic-body' : ''}`}>{t('about.values.support.description')}</p>
            </div>

            <div className={`bg-white p-8 rounded-2xl shadow-lg ${isRTL ? 'text-right' : 'text-center'}`} data-testid="value-risk">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold text-slate-900 mb-2 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.values.risk.title')}</h4>
              <p className={`text-slate-600 ${isRTL ? 'arabic-body' : ''}`}>{t('about.values.risk.description')}</p>
            </div>

            <div className={`bg-white p-8 rounded-2xl shadow-lg ${isRTL ? 'text-right' : 'text-center'}`} data-testid="value-peace">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold text-slate-900 mb-2 ${isRTL ? 'arabic-heading' : ''}`}>{t('about.values.peace.title')}</h4>
              <p className={`text-slate-600 ${isRTL ? 'arabic-body' : ''}`}>{t('about.values.peace.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
