import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { CategorySelect } from './CategorySelect';
import { WorkflowFormData } from '@/types/Workflow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileJson,
  Tags,
  DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UploadFormProps {
  onSubmit: (data: WorkflowFormData, file: File) => Promise<void>;
}

const steps = [
  { id: 'file', title: 'Upload File', icon: FileJson },
  { id: 'details', title: 'Workflow Details', icon: Upload },
  { id: 'categories', title: 'Categories', icon: Tags },
  { id: 'pricing', title: 'Pricing', icon: DollarSign },
];

export function UploadForm({ onSubmit }: UploadFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<WorkflowFormData>({
    name: '',
    creator: '',
    description: '',
    valueProposition: '',
    categories: [],
    price: 0
  });
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    await onSubmit(formData, selectedFile);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <FileUpload
              onFileSelect={(file) => setSelectedFile(file)}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Workflow Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your workflow"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="valueProposition">Value Proposition</Label>
              <Textarea
                id="valueProposition"
                value={formData.valueProposition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    valueProposition: e.target.value,
                  })
                }
                placeholder="What problem does this workflow solve?"
                rows={4}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>Categories</Label>
            <CategorySelect
              value={formData.categories}
              onChange={(cats) =>
                setFormData({ ...formData, categories: cats })
              }
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="pl-8"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter 0 for free workflows
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              index <= currentStep
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                index <= currentStep
                  ? 'border-primary'
                  : 'border-muted-foreground'
              }`}
            >
              {<step.icon className="w-5 h-5" />}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentStep === 0 ? 'Cancel' : 'Back'}
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  disabled={!selectedFile}
                  className="flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Workflow
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
