import ServicesPreview from "@/components/sections/services-preview";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t, isRTL } = useI18n();
  return (
    <div className="pt-16" data-testid="services-page">
      <ServicesPreview />

      {/* Additional Service Details */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Why Choose ELIZDEHAR?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Quality Assurance</h3>
              <p className="text-slate-600">
                Every product and service meets our rigorous quality standards, ensuring customer satisfaction and long-term reliability.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Sustainable Practices</h3>
              <p className="text-slate-600">
                We prioritize environmental responsibility and sustainable business practices across all our operations.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Expert Team</h3>
              <p className="text-slate-600">
                Our experienced professionals bring decades of industry knowledge and innovative thinking to every project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
