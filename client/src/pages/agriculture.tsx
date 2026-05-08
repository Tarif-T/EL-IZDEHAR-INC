import { Leaf, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Agriculture() {
  return (
    <div className="pt-16" data-testid="agriculture-page">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-green-600 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">EL IZDEHAR Agriculture</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Our diverse agricultural industries produce a range of fresh and healthy products, 
                including fruits, vegetables, animal products, and seeds. We prioritize sustainability 
                and ethical practices in our farming methods.
              </p>
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-slate-100">
                <Link href="/contact">Learn More <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern agricultural farming operations"
                className="rounded-2xl shadow-2xl"
                data-testid="agriculture-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Agricultural Excellence
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { title: "Organic Farming", description: "Chemical-free cultivation methods for healthier produce" },
              { title: "Fresh Products", description: "Daily harvest ensuring maximum freshness and quality" },
              { title: "Sustainable Methods", description: "Environmentally responsible farming practices" },
              { title: "Ethical Practices", description: "Fair treatment of workers and sustainable land use" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Farming Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Soil preparation and planting"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Soil Preparation</h4>
              <p className="text-slate-600">Scientific soil analysis and preparation for optimal crop growth.</p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1592982755733-8880df69e22a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Crop cultivation and care"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Cultivation & Care</h4>
              <p className="text-slate-600">Regular monitoring and care throughout the growing season.</p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Harvest and processing"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold text-slate-900">Harvest & Processing</h4>
              <p className="text-slate-600">Timely harvest and careful processing to maintain quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Agricultural Products
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fresh Vegetables",
                description: "Seasonal vegetables grown with organic methods",
                image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Fruits & Berries",
                description: "Sweet and nutritious fruits harvested at peak ripeness",
                image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Grains & Cereals",
                description: "High-quality grains for food and livestock feed",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Seeds & Seedlings",
                description: "Premium seeds for agricultural and gardening use",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Animal Products",
                description: "Dairy, eggs, and other animal-derived products",
                image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Organic Fertilizers",
                description: "Natural fertilizers made from farm waste",
                image: "https://images.unsplash.com/photo-1574943270433-be0eb5af1f79?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
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

      {/* Sustainability Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Sustainable Agriculture Practices
              </h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                We are committed to sustainable farming practices that protect the environment, 
                support local communities, and ensure long-term agricultural productivity.
              </p>
              <div className="space-y-4">
                {[
                  "Water conservation and efficient irrigation systems",
                  "Crop rotation to maintain soil health",
                  "Integrated pest management without harmful chemicals",
                  "Renewable energy use in farming operations",
                  "Community education and support programs",
                ].map((practice, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{practice}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Sustainable farming practices"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with Us</h2>
          <p className="text-xl text-green-100 mb-8">
            Join us in sustainable agriculture and discover how our fresh, quality products 
            can benefit your business and community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-slate-100">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
