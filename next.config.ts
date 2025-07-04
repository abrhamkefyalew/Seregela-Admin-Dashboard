// Import the Next.js configuration type to provide strong typing support
import type { NextConfig } from "next";

// Define the Next.js configuration
const nextConfig: NextConfig = {

  // --------------------------------------------
  // ESLint Configuration:
  // Prevents the build from failing due to ESLint errors.
  // This is useful for CI/CD or Docker builds where warnings shouldn't block builds.
  // Use with caution — errors will be ignored silently.
  // --------------------------------------------
  eslint: {
    ignoreDuringBuilds: true, // Ignores lint errors during `next build`
  },



  
  // Remove "N"  = >  Disable Next.js DevTools (REMOVEs the "N" icon entirely) from the left bottom of the screen
  //                  THE below codes each try to Disable Next.js DevTools (i.e. Try to REMOVE the "N" icon entirely) 
  //
  // --------------------------------------------
  // Dev Indicators Configuration:
  // Hides the "N" loading icon (bottom-left) shown during development.
  // The icon indicates build activity but is optional UX.
  // This setting only affects `npm run dev`, not production.
  // --------------------------------------------
  // devIndicators: {
  //   buildActivity: false, // Hides the spinning "N" icon in dev mode
  // },
  //  
  //
  devIndicators: false, // Disables the "N" DevTools UI overlay - [ - WORKING - ] - [ - USED - ] - 
  //
  //
  // devtools: {
  //   enabled: false, // Disable Next.js DevTools (removes the "N" icon entirely)
  // },
  //
  //
  //
  //
  //
  // NOT working // have syntax Errors
  // experimental: {
  //   nextDevTools: {
  //     enabled: false, // DISABLE the "N" DevTools overlay
  //   },
  // },







  // --------------------------------------------
  // Webpack Customization:
  // Enables polling for file changes, useful inside Docker or VMs
  // where file watching with inotify may not work reliably.
  // Also adds a delay (aggregateTimeout) to avoid too many rebuilds.
  // --------------------------------------------
  webpack: (config: any) => {
    config.watchOptions = {
      poll: 1000, // Check for file changes every 1000ms (1 second)
      aggregateTimeout: 300, // ⏱ Wait 300ms after the last change before rebuilding
    };
    return config;
  },
};

// Export the configuration so Next.js can use it
export default nextConfig;
