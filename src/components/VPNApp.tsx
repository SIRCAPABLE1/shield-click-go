import { useState } from 'react';
import { Server, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VPNDashboard } from '@/components/VPNDashboard';
import { ServerSelector } from '@/components/ServerSelector';
import { SettingsPage } from '@/components/SettingsPage';

type AppView = 'dashboard' | 'servers' | 'settings';

export const VPNApp = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'servers':
        return <ServerSelector onBack={() => setCurrentView('dashboard')} />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
          <div className="relative">
            <VPNDashboard />
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentView('servers')}
                  className="rounded-xl"
                >
                  <Server className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentView('settings')}
                  className="rounded-xl"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderView();
};