export interface Workflow {
  id: number;
  user_id: string;
  original_filename: string;
  stored_filename: string;
  metadata: {
    name: string;
    description: string;
    valueProposition: string;
    categories: string[];
  };
  is_paid: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}

export type WorkflowFormData = {
  name: string;
  description: string;
  valueProposition: string;
  categories: string[];
  price: number;
};
