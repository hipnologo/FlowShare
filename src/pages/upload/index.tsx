import { useState } from 'react';
import { UploadForm } from '@/components/upload/UploadForm';
import { WorkflowFormData } from '@/types/Workflow';
import { useAuth } from '@/contexts/AuthContext';
import { createWorkflow } from '@/lib/workflow';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AuthDialog } from '@/components/auth/AuthDialog';

export default function UploadPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(!user);

  const handleSubmit = async (data: WorkflowFormData, file: File) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    try {
      await createWorkflow(data, file, user.id);
      toast({
        title: 'Success',
        description: 'Workflow uploaded successfully!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload workflow. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-8">Upload New Workflow</h1>
        <UploadForm onSubmit={handleSubmit} />
      </div>

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => navigate('/')}
        onSuccess={handleAuthSuccess}
        mode="signin"
      />
    </Layout>
  );
}
