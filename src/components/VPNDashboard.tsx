import { Shield, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVPN } from '@/hooks/useVPN';
import { cn } from '@/lib/utils';

const statusConfig = {
  disconnected: {
    icon: Shield,
    text: 'Disconnected',
    description: 'Click to connect and secure your browsing',
    color: 'text-vpn-disconnected',
    bgColor: 'bg-vpn-disconnected/10',
  },
  connecting: {
    icon: Loader2,
    text: 'Connecting...',
    description: 'Establishing secure connection',
    color: 'text-vpn-connecting',
    bgColor: 'bg-vpn-connecting/10',
  },
  connected: {
    icon: ShieldCheck,
    text: 'Connected',
    description: 'Your connection is secure and encrypted',
    color: 'text-vpn-connected',
    bgColor: 'bg-vpn-connected/10',
  },
  disconnecting: {
    icon: Loader2,
    text: 'Disconnecting...',
    description: 'Terminating connection',
    color: 'text-vpn-disconnected',
    bgColor: 'bg-vpn-disconnected/10',
  },
};

export const VPNDashboard = () => {
  const { status, selectedServer, toggleConnection } = useVPN();
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Lockline
          </h1>
          <p className="text-muted-foreground mt-2">
            Your privacy, secured
          </p>
        </div>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="text-center pb-4">
            <div className={cn(
              "mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4",
              config.bgColor
            )}>
              <Icon 
                className={cn(
                  "w-12 h-12",
                  config.color,
                  status === 'connecting' || status === 'disconnecting' ? 'animate-spin' : ''
                )} 
              />
            </div>
            <CardTitle className={cn("text-xl", config.color)}>
              {config.text}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {config.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant={status === 'connected' ? 'disconnect' : 'connect'}
              size="hero"
              onClick={toggleConnection}
              disabled={status === 'connecting' || status === 'disconnecting'}
              className="w-full"
            >
              {status === 'connected' ? 'Disconnect' : 'Connect'}
            </Button>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-sm">Current Server</p>
                <p className="text-muted-foreground text-xs">
                  {selectedServer.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedServer.flag}</span>
                <Badge variant="secondary" className="text-xs">
                  {selectedServer.ping}ms
                </Badge>
              </div>
            </div>

            {status === 'connected' && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-vpn-secure font-bold">256-bit</div>
                  <div className="text-xs text-muted-foreground">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-vpn-connected font-bold">Secured</div>
                  <div className="text-xs text-muted-foreground">IP Address</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};