export interface Workflow {
    id: string;
    name: string;
    creator: string;
    description: string;
    valueProposition: string;
    categories: string[];
    downloads: number;
    price: number;
    fileName: string;
  }
  
  export type WorkflowFormData = Omit<Workflow, 'id' | 'downloads' | 'fileName'>;