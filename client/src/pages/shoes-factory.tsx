import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ShoesFactory() {
  return (
    <div className="pt-16" data-testid="shoes-factory-page">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">EL IZDEHAR Shoes Factory</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Discover a wide range of high-quality shoes crafted with precision and care at our factory. 
                Our commitment to excellence shines through in every pair we make.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
                <Link href="/contact">Get Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Shoe manufacturing process"
                className="rounded-2xl shadow-2xl"
                data-testid="shoes-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Manufacturing Excellence
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { title: "Quality Materials", description: "Premium leather and synthetic materials sourced from trusted suppliers" },
              { title: "Expert Craftsmanship", description: "Skilled artisans with years of experience in shoe manufacturing" },
              { title: "Sustainable Production", description: "Eco-friendly processes that minimize environmental impact" },
              { title: "Custom Solutions", description: "Tailored designs and specifications to meet client requirements" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Process Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Shoe design process"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Design & Planning</h4>
              <p className="text-slate-600">Our design team creates innovative and functional shoe designs.</p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Material cutting process"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Material Cutting</h4>
              <p className="text-slate-600">Precision cutting of materials using advanced machinery.</p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Assembly and finishing"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Assembly & Finishing</h4>
              <p className="text-slate-600">Expert assembly and quality finishing for perfect results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Product Range
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Casual Footwear",
                description: "Comfortable everyday shoes for all occasions",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Formal Shoes",
                description: "Elegant business and formal occasion footwear",
                image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Sports Shoes",
                description: "High-performance athletic and sports footwear",
                image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Work Boots",
                description: "Durable and safe footwear for industrial use",
                image: "https://images.unsplash.com/photo-1608667508764-6be191ceeda2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Children's Shoes",
                description: "Safe and comfortable footwear for kids",
                image: "https://images.unsplash.com/photo-1515496281361-462aff5d7bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Custom Designs",
                description: "Bespoke shoes made to your specifications",
                image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.title}</h3>
                  <p className="text-slate-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Order?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your footwear manufacturing needs and get a customized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
              <Link href="/contact">Request Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
