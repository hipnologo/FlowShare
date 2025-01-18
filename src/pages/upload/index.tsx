import { UploadForm } from '@/components/upload/UploadForm';
import { WorkflowFormData } from '@/types/Workflow';

export default function UploadPage() {
  const handleSubmit = async (data: WorkflowFormData, file: File) => {
    // TODO: Implement file upload logic and workflow creation
    console.log('Form data:', data);
    console.log('File:', file);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Workflow</h1>
        <UploadForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}