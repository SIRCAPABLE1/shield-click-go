import { Settings, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useVPN } from '@/hooks/useVPN';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const { autoConnect, setAutoConnect } = useVPN();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-vpn-secure" />
              Connection Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-connect" className="text-sm font-medium">
                  Auto-connect on startup
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically connect when the app opens
                </p>
              </div>
              <Switch
                id="auto-connect"
                checked={autoConnect}
                onCheckedChange={setAutoConnect}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-vpn-secure" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-vpn-connected/10 rounded-lg">
              <div className="w-2 h-2 bg-vpn-connected rounded-full"></div>
              <div>
                <p className="text-sm font-medium">AES-256 Encryption</p>
                <p className="text-xs text-muted-foreground">
                  Military-grade encryption enabled
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-vpn-connected/10 rounded-lg">
              <div className="w-2 h-2 bg-vpn-connected rounded-full"></div>
              <div>
                <p className="text-sm font-medium">No-logs Policy</p>
                <p className="text-xs text-muted-foreground">
                  Your activity is never recorded
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-vpn-connected/10 rounded-lg">
              <div className="w-2 h-2 bg-vpn-connected rounded-full"></div>
              <div>
                <p className="text-sm font-medium">DNS Leak Protection</p>
                <p className="text-xs text-muted-foreground">
                  Prevents DNS requests from leaking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-vpn-secure" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-vpn-secure">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-vpn-secure">6</div>
                <div className="text-xs text-muted-foreground">Global Servers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};