import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Tahir Tagelsir",
    role: "CEO",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled_design__50_-removebg-preview-1-1024x1024.png",
    testId: "team-tahir",
  },
  {
    name: "Amin Tagelsir",
    role: "Projects Consultant",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled-design-58-1024x1024.jpg",
    testId: "team-amin",
  },
  {
    name: "Esam Amer",
    role: "Project Manager",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/IMG_1802-removebg-preview-1-1022x1024.png",
    testId: "team-esam",
  },
  {
    name: "Wedyan Tagelsir",
    role: "Financial Manager",
    image: "https://elizdehar.com/wp-content/uploads/2023/04/Untitled_design__57_-removebg-preview.png",
    testId: "team-wedyan",
  },
];

export default function TeamPreview() {
  return (
    <section className="section-padding bg-white dark:bg-background" data-testid="team-preview">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-20">
          <div className="animate-slide-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-xl text-muted-foreground mb-10">People you can trust</p>
            <Button asChild variant="outline" className="card-3d glow-effect hover:scale-105 px-8 py-4 rounded-2xl font-semibold transition-all duration-300">
              <Link href="/team">View Full Team</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }} data-testid={member.testId}>
              <div className="glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:scale-102">
                <div className="relative mb-8">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    onError={(e) => {
                      const initials = member.name.split(" ").map(n => n[0]).join("+");
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initials}&background=1e40af&color=fff&size=256&bold=true`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  {member.name}
                </h4>
                <p className="text-primary font-semibold mb-6 text-sm uppercase tracking-wider">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 card-3d"
                    data-testid={`${member.testId}-linkedin`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 card-3d"
                    data-testid={`${member.testId}-email`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
