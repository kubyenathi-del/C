import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// HTTPS is always enabled in dev. Browsers block the Geolocation API outside a
// secure context, so a phone testing over the local network (http://<ip>:5173)
// would never be able to read GPS. `host: true` exposes the dev server on the
// local network so a phone on the same Wi-Fi can reach it.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: true,
    host: true,
    allowedHosts: ['.vercel.run'],
  },
});
