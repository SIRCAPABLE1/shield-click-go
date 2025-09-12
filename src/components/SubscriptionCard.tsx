import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionCard = () => {
  const { user, subscribed, subscriptionEnd, session, checkSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create checkout session",
          variant: "destructive",
        });
        return;
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to open customer portal",
          variant: "destructive",
        });
        return;
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong", 
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setRefreshing(true);
    await checkSubscription();
    setTimeout(() => setRefreshing(false), 1000);
    toast({
      title: "Status Updated",
      description: "Subscription status has been refreshed",
      variant: "default",
    });
  };

  if (!user) return null;

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Crown className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl">VPN Premium</CardTitle>
        </div>
        <CardDescription>
          {subscribed ? 'Your Premium Plan' : 'Upgrade to Premium'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscribed ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <Check className="w-3 h-3 mr-1" />
                Active Subscription
              </Badge>
            </div>
            {subscriptionEnd && (
              <p className="text-sm text-muted-foreground text-center">
                Renews on {new Date(subscriptionEnd).toLocaleDateString()}
              </p>
            )}
            <div className="space-y-2">
              <Button
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {loading ? 'Loading...' : 'Manage Subscription'}
              </Button>
              <Button
                onClick={handleRefreshStatus}
                disabled={refreshing}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$10</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-2" />
                Unlimited bandwidth
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-2" />
                Global server access
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-2" />
                Premium support
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-2" />
                No ads
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Loading...' : 'Subscribe Now'}
              </Button>
              <Button
                onClick={handleRefreshStatus}
                disabled={refreshing}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};