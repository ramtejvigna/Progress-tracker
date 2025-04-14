import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from 'lucide-react';
import { format } from "date-fns";

interface BadgeCardProps {
  name: string;
  description: string;
  earnedAt?: string;
  imageUrl?: string;
}

export function BadgeCard({ name, description, earnedAt, imageUrl }: BadgeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/10 p-4 flex justify-center">
        {imageUrl ? (
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="h-16 w-16" />
        ) : (
          <Trophy className="h-16 w-16 text-primary" />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        {earnedAt && (
          <p className="text-xs text-muted-foreground mt-2">
            Earned on {format(new Date(earnedAt), "MMMM d, yyyy")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}