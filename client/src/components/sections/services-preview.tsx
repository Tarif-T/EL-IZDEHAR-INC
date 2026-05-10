import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import shoeFactoryImage from "@assets/optimized/shoes-factory.jpeg";
import importExportImage from "@assets/optimized/import-export-facility.jpg";
import agricultureImage from "@assets/optimized/sustainable-agriculture.jpg";

const getServices = (t: (key: string) => string) => [
  {
    title: t('services.shoes.title'),
    description: t('services.shoes.description'),
    features: [
      t('services.shoes.features.materials'),
      t('services.shoes.features.craftsmanship'), 
      t('services.shoes.features.production'),
      t('services.shoes.features.solutions')
    ],
    image: shoeFactoryImage,
    href: "/shoes-factory",
    testId: "service-shoes",
  },
  {
    title: t('services.import.title'),
    description: t('services.import.description'),
    features: [
      t('services.import.features.network'),
      t('services.import.features.quality'),
      t('services.import.features.logistics'),
      t('services.import.features.delivery')
    ],
    image: importExportImage,
    href: "/import-export",
    testId: "service-import-export",
    reverse: true,
  },
  {
    title: t('services.agriculture.title'),
    description: t('services.agriculture.description'),
    features: [
      t('services.agriculture.features.organic'),
      t('services.agriculture.features.fresh'),
      t('services.agriculture.features.sustainable'),
      t('services.agriculture.features.ethical')
    ],
    image: agricultureImage,
    href: "/agriculture",
    testId: "service-agriculture",
  },
];

export default function ServicesPreview() {
  const { t, isRTL } = useI18n();
  const services = getServices(t);

  return (
    <section className="section-padding bg-gradient-to-br from-background via-muted/50 to-background" data-testid="services-preview">
      <div className="max-w-7xl mx-auto container-padding">
        <div className={`text-center mb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="animate-slide-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }} data-testid={service.testId}>
              <div className="card-3d glass-effect rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
                <div className={`grid lg:grid-cols-2 ${service.reverse ? 'lg:grid-cols-2' : ''}`}>
                  <div className={`p-12 lg:p-20 ${service.reverse ? 'order-2 lg:order-1' : ''}`}>
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 group/feature">
                          <CheckCircle className="text-secondary w-6 h-6 group-hover/feature:scale-110 transition-transform duration-200" />
                          <span className="text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="card-3d glow-effect bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-lg text-lg px-8 py-4 rounded-2xl font-semibold transition-all duration-300">
                      <Link href={service.href} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {t('services.learnMore')} 
                        <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Link>
                    </Button>
                  </div>
                  <div className={`relative h-80 lg:h-auto overflow-hidden ${service.reverse ? 'order-1 lg:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
