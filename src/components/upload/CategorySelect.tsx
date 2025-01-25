import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  'Social Media',
  'CRM',
  'Marketing',
  'Automation',
  'Analytics',
  'DevOps',
  'Productivity',
  'Communication',
  'Sales',
  'Customer Support'
];

interface CategorySelectProps {
  onChange: (categories: string[]) => void;
  value: string[];
}

export function CategorySelect({ onChange, value }: CategorySelectProps) {
  const toggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      onChange([...value, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Badge
          key={category}
          variant="outline"
          className={cn(
            "cursor-pointer hover:bg-primary/20",
            value.includes(category) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
