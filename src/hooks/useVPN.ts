import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export type VPNStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
}

export const servers: Server[] = [
  { id: 'us-east', name: 'New York, US', country: 'US', flag: '🇺🇸', ping: 45 },
  { id: 'us-west', name: 'Los Angeles, US', country: 'US', flag: '🇺🇸', ping: 52 },
  { id: 'uk', name: 'London, UK', country: 'UK', flag: '🇬🇧', ping: 89 },
  { id: 'germany', name: 'Frankfurt, DE', country: 'DE', flag: '🇩🇪', ping: 72 },
  { id: 'japan', name: 'Tokyo, JP', country: 'JP', flag: '🇯🇵', ping: 125 },
  { id: 'singapore', name: 'Singapore, SG', country: 'SG', flag: '🇸🇬', ping: 110 },
];

export const useVPN = () => {
  const [status, setStatus] = useState<VPNStatus>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [autoConnect, setAutoConnect] = useState(false);
  const { toast } = useToast();

  const connect = useCallback(async () => {
    setStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setStatus('connected');
      toast({
        title: "VPN Connected",
        description: `Connected to ${selectedServer.name}`,
        variant: "default",
      });
    }, 2000);
  }, [selectedServer.name, toast]);

  const disconnect = useCallback(async () => {
    setStatus('disconnecting');
    
    // Simulate disconnection process
    setTimeout(() => {
      setStatus('disconnected');
      toast({
        title: "VPN Disconnected",
        description: "Your connection has been terminated",
        variant: "destructive",
      });
    }, 1000);
  }, [toast]);

  const toggleConnection = useCallback(() => {
    if (status === 'connected') {
      disconnect();
    } else if (status === 'disconnected') {
      connect();
    }
  }, [status, connect, disconnect]);

  return {
    status,
    selectedServer,
    setSelectedServer,
    autoConnect,
    setAutoConnect,
    connect,
    disconnect,
    toggleConnection,
    servers,
  };
};