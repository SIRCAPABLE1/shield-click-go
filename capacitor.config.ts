import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fa8b97e7177041769f644aa51aaf5f61',
  appName: 'Lockline',
  webDir: 'dist',
  server: {
    url: 'https://fa8b97e7-1770-4176-9f64-4aa51aaf5f61.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f172a",
      showSpinner: false
    }
  }
};

export default config;