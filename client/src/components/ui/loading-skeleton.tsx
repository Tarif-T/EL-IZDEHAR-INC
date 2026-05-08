/**
 * Loading skeleton components for better UX
 */
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3 p-6">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[180px]" />
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-[160px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-12 w-[400px]" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[80%]" />
          <Skeleton className="h-12 w-[200px] rounded-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function TeamMemberSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center space-y-4">
      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
      <Skeleton className="h-6 w-[140px] mx-auto" />
      <Skeleton className="h-4 w-[100px] mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%] mx-auto" />
    </div>
  );
}