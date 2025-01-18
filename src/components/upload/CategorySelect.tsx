import { useState } from 'react';

const CATEGORIES = ['Social Media', 'CRM', 'Marketing', 'Automation', 'Analytics'];

interface CategorySelectProps {
  onChange: (categories: string[]) => void;
  value: string[];
}

export const CategorySelect = ({ onChange, value }: CategorySelectProps) => {
  return (
    <div className="space-y-2">
      {CATEGORIES.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value.includes(category)}
            onChange={(e) => {
              const newCategories = e.target.checked
                ? [...value, category]
                : value.filter(c => c !== category);
              onChange(newCategories);
            }}
            className="rounded"
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  );
};