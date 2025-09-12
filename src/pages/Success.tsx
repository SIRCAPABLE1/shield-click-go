import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function Success() {
  const { checkSubscription } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check subscription status when payment succeeds
    const timer = setTimeout(() => {
      checkSubscription();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [checkSubscription]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700 dark:text-green-400">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Welcome to VPN Premium! Your subscription is now active.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Unlimited bandwidth activated</p>
            <p>✓ Global server access enabled</p>
            <p>✓ Premium support available</p>
            <p>✓ Ad-free experience</p>
          </div>
          
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue to VPN
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}