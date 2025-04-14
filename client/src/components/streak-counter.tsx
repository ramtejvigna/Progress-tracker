import { FlameIcon as Fire } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Fire className="h-5 w-5 text-orange-500" />
      <span className="font-medium">{streak} day streak</span>
    </div>
  );
}