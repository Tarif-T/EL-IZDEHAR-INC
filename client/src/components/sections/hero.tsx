import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Factory, Sprout, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroImage from "@assets/optimized/hero-unity-growth.jpg";

const services = [
  {
    title: "Shoes Factory",
    description: "Premium footwear manufacturing with cutting-edge technology",
    icon: Factory,
    href: "/shoes-factory",
    gradient: "from-blue-600 to-purple-600",
    delay: "0.5s"
  },
  {
    title: "Agriculture",
    description: "Sustainable farming solutions for modern agriculture",
    icon: Sprout,
    href: "/agriculture",
    gradient: "from-green-600 to-emerald-600",
    delay: "0.7s"
  },
  {
    title: "Import & Export",
    description: "Global trade partnerships across continents",
    icon: Globe,
    href: "/import-export",
    gradient: "from-orange-600 to-red-600",
    delay: "0.9s"
  }
];

export default function Hero() {
  const { t, isRTL } = useI18n();
  
  const achievements = [
    { number: "30+", label: t('hero.achievements.years') },
    { number: "1000+", label: t('hero.achievements.clients') },
    { number: "500+", label: t('hero.achievements.projects') }
  ];

  return (
    <section
      className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50 dark:from-background dark:via-muted/40 dark:to-background"
      data-testid="hero-section"
    >
      {/* Circular Wave Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full border-[1px] border-green-100/30 dark:border-primary/10" style={{ transform: 'scale(2)' }}></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full border-[1px] border-green-100/20 dark:border-primary/10" style={{ transform: 'scale(2.5)' }}></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full border-[1px] border-green-100/10 dark:border-primary/10" style={{ transform: 'scale(3)' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full border-[1px] border-green-100/30 dark:border-primary/10" style={{ transform: 'scale(2)' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full border-[1px] border-green-100/20 dark:border-primary/10" style={{ transform: 'scale(2.5)' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto container-padding pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-8 animate-slide-in-up h-full">
            {/* Headlines */}
            <div className={isRTL ? '' : 'text-left'}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                data-testid="hero-title"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
              >
                <span className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-[50px] ${isRTL ? 'arabic-heading' : ''}`}>
                  {t('hero.title')}
                </span>
                <br />
                <span className={`text-foreground text-[55px] ${isRTL ? 'arabic-heading' : ''}`}>{t('hero.subtitle')}</span>
              </h1>
              <h2 
                className={`md:text-3xl text-muted-foreground font-light text-[20px] ${isRTL ? 'arabic-subtitle' : ''}`}
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}
              >
                {t('hero.description')}
              </h2>
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 px-8 py-6 text-lg rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="cta-services"
              >
                <Link href="/services" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('hero.cta')} 
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 px-8 py-6 text-lg rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary"
                data-testid="cta-contact"
              >
                <Link href="/contact" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('nav.contact')} 
                  <Phone className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </Link>
              </Button>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image with Floating Services */}
          <div className="relative animate-slide-in-up h-full flex flex-col justify-center" style={{ animationDelay: '0.3s' }}>
            {/* Main Image */}
            <div className="relative rounded-full overflow-hidden aspect-square">
              <img
                src={heroImage}
                alt="Unity and Growth - ELIZDEHAR Inc."
                className="w-full h-full object-cover animate-pulse-zoom"
              />
            </div>

            {/* Floating Service Badges */}
            {services.map((service, index) => {
              const Icon = service.icon;
              // Perfectly centered middle card with equal spacing
              const positions = isRTL ? [
                { top: '15%', left: '-5%' }, // Top card
                { top: '50%', left: '-7%', transform: 'translateY(-50%)' }, // Middle card - perfectly centered
                { bottom: '15%', left: '-5%' } // Bottom card
              ] : [
                { top: '15%', right: '-5%' }, // Top card
                { top: '50%', right: '-7%', transform: 'translateY(-50%)' }, // Middle card - perfectly centered
                { bottom: '15%', right: '-5%' } // Bottom card
              ];
              
              const position = positions[index];
              
              return (
                <Link
                  key={index}
                  href={service.href}
                  className="absolute group animate-scale-in"
                  style={{ 
                    ...position,
                    animationDelay: `${0.8 + index * 0.2}s`,
                    ['--translate-y' as any]: position.transform?.includes('translateY') ? '-50%' : '0'
                  }}
                >
                  <div className="bg-white/20 dark:bg-card/80 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-white/30 dark:border-primary/20 hover:bg-white/30 dark:hover:bg-card">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="pr-2 md:pr-4">
                        <h3 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-xs hidden sm:block text-[#0d0d0d] dark:text-muted-foreground">
                          Click to explore
                        </p>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Additional Background Decorations */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-green-100/20 dark:bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-green-100/20 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
