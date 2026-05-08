import AnimatedCounter from "@/components/ui/animated-counter";

const stats = [
  { value: 23876, label: "Successful Clients", testId: "stat-clients" },
  { value: 1208, label: "Ongoing Projects", testId: "stat-projects" },
  { value: 23900, label: "Successful Strategies", testId: "stat-strategies" },
  { value: 234965, label: "Successful Investments", testId: "stat-investments" },
];

export default function Stats() {
  return (
    <div className="modern-gradient text-white rounded-3xl p-16 shadow-2xl card-3d pulse-glow" data-testid="stats-section">
      <div className="text-center mb-16">
        <div className="animate-slide-in-up">
          <h3 className="text-4xl md:text-5xl font-bold mb-6" data-testid="stats-title">
            30 Years of Experience
          </h3>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" data-testid="stats-subtitle">
            We have been working in this field for 30 years and we are really excited to move forward with more new things.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
              <AnimatedCounter
                end={stat.value}
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
                testId={stat.testId}
              />
              <div className="text-white/80 font-medium text-sm uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
