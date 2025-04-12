import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface LoadingSkeletonProps {
  className?: string;
}

export function TextLineSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Skeleton
      className={cn("h-4 w-full rounded-md", className)}
    />
  );
}

export function CircleSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Skeleton
      className={cn("h-12 w-12 rounded-full", className)}
    />
  );
}

export function ImageSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Skeleton
      className={cn("h-48 w-full rounded-md", className)}
    />
  );
}

export function CardSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="gap-2">
        <CircleSkeleton className="h-10 w-10" />
        <TextLineSkeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2 pb-3">
        <TextLineSkeleton />
        <TextLineSkeleton />
        <TextLineSkeleton className="w-4/5" />
      </CardContent>
      <CardFooter>
        <TextLineSkeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  );
}

export function FeatureCardSkeleton() {
  return (
    <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10">
      <CardHeader>
        <CircleSkeleton />
        <TextLineSkeleton className="h-6 mt-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <TextLineSkeleton />
        <TextLineSkeleton />
        <TextLineSkeleton className="w-4/5" />
        <TextLineSkeleton className="w-2/3" />
      </CardContent>
    </Card>
  );
}

export function FAQSkeleton() {
  return (
    <div className="space-y-2 py-3 border-b">
      <TextLineSkeleton className="h-6 w-4/5" />
      <div className="hidden">
        <TextLineSkeleton />
        <TextLineSkeleton />
        <TextLineSkeleton className="w-4/5" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <TextLineSkeleton className="h-12 w-3/4" />
            <TextLineSkeleton className="h-12 w-1/2" />
            <div className="space-y-3 py-4">
              <TextLineSkeleton className="h-5" />
              <TextLineSkeleton className="h-5" />
              <TextLineSkeleton className="h-5 w-4/5" />
            </div>
            <TextLineSkeleton className="h-10 w-40" />
          </div>
          <div className="hidden lg:block">
            <ImageSkeleton className="h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSectionSkeleton() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <TextLineSkeleton className="h-8 w-1/3 mx-auto" />
          <div className="mt-4 max-w-2xl mx-auto">
            <TextLineSkeleton className="h-5 mt-4" />
            <TextLineSkeleton className="h-5 mt-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <FeatureCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQSectionSkeleton() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <TextLineSkeleton className="h-8 w-1/3 mx-auto" />
          <TextLineSkeleton className="h-5 w-2/3 mx-auto mt-4" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <FAQSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}