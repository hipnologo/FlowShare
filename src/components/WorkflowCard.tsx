import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./auth/AuthDialog";

interface WorkflowCardProps {
  title: string;
  description: string;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  isPaid?: boolean;
  price?: string;
  onDownload?: () => Promise<void>;
}

export function WorkflowCard({
  title,
  description,
  author,
  downloads,
  rating,
  tags,
  isPaid = false,
  price = "Free",
  onDownload,
}: WorkflowCardProps) {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleDownloadClick = async () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    
    if (onDownload) {
      await onDownload();
    }
  };

  const handleAuthSuccess = () => {
    // Automatically trigger download after successful authentication
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
          <div className="text-sm text-gray-500">by {author}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-secondary/50 pt-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {downloads}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {rating}
            </span>
          </div>
          <Button 
            variant={isPaid ? "default" : "outline"}
            onClick={handleDownloadClick}
          >
            {isPaid ? price : "Download"}
          </Button>
        </CardFooter>
      </Card>

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
        mode="signin"
      />
    </>
  );
}
