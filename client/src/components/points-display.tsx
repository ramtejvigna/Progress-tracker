import { Star } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PointsDisplay({ points, size = "md", className }: PointsDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl font-bold",
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Star className={`${size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"} text-yellow-500`} />
      <span className={sizeClasses[size]}>{points} points</span>
    </div>
  );
}