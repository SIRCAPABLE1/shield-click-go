import { Check, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVPN, type Server } from '@/hooks/useVPN';
import { cn } from '@/lib/utils';

interface ServerSelectorProps {
  onBack: () => void;
}

export const ServerSelector = ({ onBack }: ServerSelectorProps) => {
  const { selectedServer, setSelectedServer, servers, status } = useVPN();

  const handleServerSelect = (server: Server) => {
    if (status === 'disconnected') {
      setSelectedServer(server);
      onBack();
    }
  };

  const getPingColor = (ping: number) => {
    if (ping < 60) return 'text-vpn-connected';
    if (ping < 100) return 'text-vpn-connecting';
    return 'text-vpn-disconnected';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">Select Server</h1>
        </div>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-vpn-secure" />
              Available Servers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {servers.map((server) => (
              <Button
                key={server.id}
                variant="server"
                className={cn(
                  "w-full h-auto p-4",
                  selectedServer.id === server.id && "ring-2 ring-vpn-secure",
                  status !== 'disconnected' && "opacity-50 pointer-events-none"
                )}
                onClick={() => handleServerSelect(server)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{server.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{server.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {server.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getPingColor(server.ping))}
                    >
                      {server.ping}ms
                    </Badge>
                    {selectedServer.id === server.id && (
                      <Check className="w-4 h-4 text-vpn-secure" />
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {status !== 'disconnected' && (
          <Card className="bg-vpn-connecting/10 border-vpn-connecting/30">
            <CardContent className="pt-6">
              <p className="text-center text-sm text-muted-foreground">
                Disconnect to change servers
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};