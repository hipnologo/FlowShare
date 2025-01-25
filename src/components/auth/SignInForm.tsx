import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast({
        title: 'Success',
        description: 'Successfully signed in!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
        />
        <button type="submit" className="w-full rounded bg-blue-500 p-2 text-white">
          Sign In
        </button>
        <Link to="/signup" className="block text-center text-blue-500">
          Need an account? Sign Up
        </Link>
      </form>
    </div>
  );
}
