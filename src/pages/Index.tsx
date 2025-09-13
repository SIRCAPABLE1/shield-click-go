import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { VPNApp } from '@/components/VPNApp';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, User, Crown } from 'lucide-react';

const Index = () => {
  const { user, isLoading, signOut, subscribed } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Lockline
          </h1>
          <p className="text-muted-foreground">
            Premium VPN service with unlimited bandwidth and global server access
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/auth">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In / Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background">
      <header className="p-4 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Lockline
            </h1>
            {subscribed && (
              <Crown className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="p-4">
        {!subscribed && (
          <div className="max-w-6xl mx-auto mb-8">
            <SubscriptionCard />
          </div>
        )}
        <VPNApp />
      </main>
    </div>
  );
};

export default Index;
