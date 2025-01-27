import { supabase } from './supabase';
import { uploadFile, deleteFile } from './minio';
import { WorkflowFormData } from '@/types/Workflow';

export const createWorkflow = async (data: WorkflowFormData, file: File, userId: string) => {
  try {
    // Upload file to MinIO
    const storedFilename = await uploadFile(file);

    // Create workflow record in Supabase
    const { data: workflow, error } = await supabase
      .from('workflows')
      .insert({
        user_id: userId,
        original_filename: file.name,
        stored_filename: storedFilename,
        metadata: {
          name: data.name,
          description: data.description,
          valueProposition: data.valueProposition,
          categories: data.categories,
        },
        is_paid: data.price > 0,
        price: data.price,
      })
      .select()
      .single();

    if (error) throw error;
    return workflow;
  } catch (error) {
    console.error('Error creating workflow:', error);
    throw error;
  }
};

export const getWorkflows = async () => {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserWorkflows = async (userId: string) => {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const deleteWorkflow = async (id: number, userId: string) => {
  // Get the workflow to get the stored filename
  const { data: workflow, error: fetchError } = await supabase
    .from('workflows')
    .select('stored_filename')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (fetchError) throw fetchError;

  // Delete from MinIO
  await deleteFile(workflow.stored_filename);

  // Delete from Supabase
  const { error: deleteError } = await supabase
    .from('workflows')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (deleteError) throw deleteError;
};
