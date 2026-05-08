import { Globe, ArrowRight, CheckCircle, Ship, Truck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ImportExport() {
  return (
    <div className="pt-16" data-testid="import-export-page">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">EL IZDEHAR Import & Export</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We offer top-notch import and export services for agriculture products, animal products, 
                and seeds. Our experienced team ensures that every product is of the highest quality, 
                and we take pride in our ability to deliver them efficiently and reliably.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Link href="/contact">Get Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Import export logistics operations"
                className="rounded-2xl shadow-2xl"
                data-testid="import-export-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Global Trade Excellence
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { title: "Global Network", description: "Extensive international partnerships and distribution channels", icon: Globe },
              { title: "Quality Assurance", description: "Rigorous quality control and certification processes", icon: CheckCircle },
              { title: "Efficient Logistics", description: "Streamlined supply chain and logistics management", icon: Truck },
              { title: "Reliable Delivery", description: "On-time delivery with full tracking and support", icon: Ship },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Process Flow */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Order Processing</h4>
              <p className="text-slate-600">Complete documentation and regulatory compliance handling</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Quality Control</h4>
              <p className="text-slate-600">Thorough inspection and quality verification before shipment</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Global Delivery</h4>
              <p className="text-slate-600">Secure packaging and efficient international shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Import & Export Services
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Ship className="mr-3 text-blue-600" />
                Import Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Agricultural products and raw materials",
                  "Seeds and seedlings from international suppliers",
                  "Farming equipment and machinery",
                  "Animal feed and nutritional supplements",
                  "Organic fertilizers and soil amendments",
                ].map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-secondary w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Plane className="mr-3 text-blue-600" />
                Export Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Fresh fruits and vegetables",
                  "Processed agricultural products",
                  "High-quality seeds and grains",
                  "Dairy and animal products",
                  "Handcrafted shoes and footwear",
                ].map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-secondary w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Market Reach */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Global Market Reach</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { region: "Middle East", countries: "15+ Countries" },
                { region: "Africa", countries: "20+ Countries" },
                { region: "Europe", countries: "12+ Countries" },
                { region: "Asia", countries: "8+ Countries" },
              ].map((market, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{market.region}</h4>
                  <p className="text-blue-600 font-medium">{market.countries}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Compliance & Certification
              </h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                We maintain the highest standards of regulatory compliance and hold certifications 
                that ensure our products meet international quality and safety requirements.
              </p>
              <div className="space-y-4">
                {[
                  "ISO 9001:2015 Quality Management",
                  "HACCP Food Safety Certification",
                  "International Organic Standards",
                  "Export License and Trade Permits",
                  "Customs and Border Protection Compliance",
                ].map((certification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{certification}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="International trade documentation and compliance"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Expand Globally?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you navigate international markets with our expert import and export services. 
            Contact us today for a customized trade solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Link href="/contact">Request Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
