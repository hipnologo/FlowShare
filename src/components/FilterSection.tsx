import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Email", "CRM", "Social Media", "Analytics", "DevOps"];
const tags = ["Free", "Paid", "Popular", "New"];

export function FilterSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Filter By</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}