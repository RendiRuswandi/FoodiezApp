import { useState } from 'react';
import { Eye, EyeOff, UtensilsCrossed } from 'lucide-react-native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface LoginScreenProps {
  onLogin: (name?: string) => void;
  onNavigateToRegister: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract name from email for demo purposes
    const name = email.split('@')[0];
    onLogin(name);
  };

  return (
    <div className="h-full w-full bg-background overflow-y-auto">
      <div className="min-h-full px-8 py-12 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary p-6 rounded-full">
            <UtensilsCrossed className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
          </div>
        </div>

        {/* Greeting */}
        <h2 className="text-primary text-center mb-2">
          Welcome Back!
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Log in to continue your food journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border focus:border-primary h-14"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border-border focus:border-primary h-14 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-right">
            <button type="button" className="text-primary">
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Login
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-muted-foreground">Or login with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 border-border hover:bg-muted"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button
            onClick={onNavigateToRegister}
            className="text-primary"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
