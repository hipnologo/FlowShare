import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { CategorySelect } from './CategorySelect';
import { WorkflowFormData } from '@/types/Workflow';

interface UploadFormProps {
  onSubmit: (data: WorkflowFormData, file: File) => Promise<void>;
}

export const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<WorkflowFormData>({
    name: '',
    creator: '',
    description: '',
    valueProposition: '',
    categories: [],
    price: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    await onSubmit(formData, selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Workflow Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Creator Name"
          value={formData.creator}
          onChange={(e) => setFormData({...formData, creator: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded h-24"
        />
        <textarea
          placeholder="Value Proposition"
          value={formData.valueProposition}
          onChange={(e) => setFormData({...formData, valueProposition: e.target.value})}
          className="w-full p-2 border rounded h-24"
        />
        <div>
          <label>Categories</label>
          <CategorySelect
            value={formData.categories}
            onChange={(cats) => setFormData({...formData, categories: cats})}
          />
        </div>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
          className="w-full p-2 border rounded"
        />
        <FileUpload onFileSelect={(file) => setSelectedFile(file)} />
      </div>
      <button 
        type="submit"
        disabled={!selectedFile}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Upload Workflow
      </button>
    </form>
  );
};