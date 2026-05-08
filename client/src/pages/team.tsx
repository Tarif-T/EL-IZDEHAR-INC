import { Linkedin, Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Untitled_design__3_ from "@assets/Untitled design (3).png";

const teamMembers = [
  {
    name: "Tahir Tagelsir",
    role: "CEO",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled_design__50_-removebg-preview-1-1024x1024.png",
    bio: "As Chief Executive Officer of ELIZDEHAR Inc., Tahir leads the company's strategic vision and operations across all business divisions, ensuring excellence in footwear manufacturing, agriculture, and international trade.",
    testId: "team-tahir",
  },
  {
    name: "Amin Tagelsir",
    role: "Projects Consultant",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled-design-58-1024x1024.jpg",
    bio: "Engineering consultant with deep expertise in project development and strategic planning across all business divisions.",
    testId: "team-amin",
  },
  {
    name: "Esam Amer",
    role: "Project Manager",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/IMG_1802-removebg-preview-1-1022x1024.png",
    bio: "Experienced project manager ensuring seamless execution of operations across shoes manufacturing, agriculture, and trade divisions.",
    testId: "team-esam",
  },
  {
    name: "Wedyan Tagelsir",
    role: "Financial Manager",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled_design__57_-removebg-preview.png",
    bio: "Financial expert managing the company's fiscal operations and ensuring sustainable growth across all business units.",
    testId: "team-wedyan",
  },
];

export default function Team() {
  const { t, isRTL } = useI18n();
  return (
    <div className="pt-16" data-testid="team-page">
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold text-slate-900 mb-6 ${isRTL ? 'arabic-heading' : ''}`}>{t('team.title')}</h1>
            <p className={`text-xl text-slate-600 max-w-3xl mx-auto ${isRTL ? 'arabic-body' : ''}`}>
              {t('team.subtitle')}
            </p>
          </div>

          {/* Founder Section */}
          <div className="bg-slate-50 rounded-3xl p-12 mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={Untitled_design__3_}
                  alt="Mr. Tag Elsir Abd Elrahman Abdullah - Founder"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                  data-testid="founder-image"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Mr. Tag Elsir Abd Elrahman Abdullah
                </h2>
                <p className="text-xl text-primary font-semibold mb-6">Founder & Visionary</p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  A significant philanthropic figure in the Sudanese economy, Mr. Abdullah has contributed 
                  to economic growth from 1975 to 2000. He established and managed institutions such as 
                  the Saudi Sudanese Bank, Al-Nile Bank, and Al Baraka Bank, as well as the EL IZDEHAR 
                  Economic Foundation.
                </p>
                <div className="bg-white p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-xl italic text-slate-800 mb-4" data-testid="founder-quote">
                    "We believe that by empowering ourselves, we can empower the world around us."
                  </p>
                  <p className="text-primary font-semibold">Founder's Philosophy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden group" data-testid={member.testId}>
                <div className="relative">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const initials = member.name.split(" ").map(n => n[0]).join("+");
                      target.src = `https://ui-avatars.com/api/?name=${initials}&background=1e40af&color=fff&size=512&bold=true&font-size=0.4`;
                      target.style.objectFit = "cover";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold text-lg mb-4">{member.role}</p>
                  <p className="text-slate-600 leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      data-testid={`${member.testId}-linkedin`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      data-testid={`${member.testId}-email`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      data-testid={`${member.testId}-phone`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Company Culture */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Our Company Culture</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Collaborative Excellence</h3>
                <p className="text-slate-600">
                  We foster a collaborative environment where every team member contributes to our shared success.
                </p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Community Focus</h3>
                <p className="text-slate-600">
                  Our commitment extends beyond business to creating positive impact in the communities we serve.
                </p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Innovation Drive</h3>
                <p className="text-slate-600">
                  We continuously innovate and adapt to stay at the forefront of our industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
