/**
 * Memoized components for performance optimization
 */
import React from "react";
import { memo } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Memoized navigation item component
 */
interface NavigationItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavigationItem = memo<NavigationItemProps>(({ 
  href, 
  label, 
  isActive, 
  onClick, 
  className 
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
        {
          "bg-primary text-primary-foreground": isActive,
          "text-muted-foreground hover:text-foreground hover:bg-muted": !isActive,
        },
        className
      )}
      data-testid={`nav-link-${href.replace('/', '')}`}
    >
      {label}
    </a>
  );
});

NavigationItem.displayName = "NavigationItem";

/**
 * Memoized service card component
 */
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: string;
  href: string;
}

export const ServiceCard = memo<ServiceCardProps>(({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  delay, 
  href 
}) => {
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer",
        "hover:scale-105 hover:shadow-2xl"
      )}
      style={{ animationDelay: delay }}
      data-testid={`service-card-${href}`}
    >
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", gradient)}>
        <Icon className="text-white w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-blue-300 text-sm font-medium group-hover:text-blue-200 transition-colors">
          {t('services.learnMore')}
        </span>
        <svg 
          className="w-5 h-5 text-blue-300 transform group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

/**
 * Memoized team member card
 */
interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  testId: string;
}

export const TeamMemberCard = memo<TeamMemberCardProps>(({ 
  name, 
  role, 
  bio, 
  image, 
  testId 
}) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
      data-testid={testId}
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-blue-300 text-sm font-medium mb-3">{role}</p>
      <p className="text-slate-300 text-sm leading-relaxed">{bio}</p>
    </div>
  );
});

TeamMemberCard.displayName = "TeamMemberCard";

/**
 * Memoized achievement stat
 */
interface AchievementStatProps {
  number: string;
  label: string;
  delay: string;
}

export const AchievementStat = memo<AchievementStatProps>(({ 
  number, 
  label, 
  delay 
}) => {
  return (
    <div 
      className="text-center animate-fade-in-up"
      style={{ animationDelay: delay }}
      data-testid={`achievement-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-slate-300 text-sm">{label}</div>
    </div>
  );
});

AchievementStat.displayName = "AchievementStat";

/**
 * Memoized contact info item
 */
interface ContactInfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  testId: string;
}

export const ContactInfoItem = memo<ContactInfoItemProps>(({ 
  icon: Icon, 
  title, 
  content, 
  testId 
}) => {
  return (
    <div className="flex items-start gap-4" data-testid={testId}>
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="text-white w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{content}</p>
      </div>
    </div>
  );
});

ContactInfoItem.displayName = "ContactInfoItem";

/**
 * Higher-order component for memoization with props comparison
 */
export function withMemoization<P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) {
  const MemoizedComponent = memo(Component, propsAreEqual);
  MemoizedComponent.displayName = `Memoized(${Component.displayName || Component.name})`;
  return MemoizedComponent;
}

/**
 * Custom comparison function for shallow props
 */
export function shallowPropsEqual<P extends object>(prevProps: P, nextProps: P): boolean {
  const prevKeys = Object.keys(prevProps) as (keyof P)[];
  const nextKeys = Object.keys(nextProps) as (keyof P)[];
  
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  
  for (const key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  
  return true;
}