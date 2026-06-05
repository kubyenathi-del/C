import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// HTTPS is OPT-IN via the `HTTPS=true` env var (see `dev:https` in package.json).
//
// Why opt-in and not always-on:
// - Hosted previews (v0, etc.) proxy the browser over HTTPS already, but connect
//   to this dev server internally over HTTP. Forcing a self-signed HTTPS-only
//   server breaks that proxy connection, so the preview never loads.
// - Geolocation still works in those previews because the *browser* sees HTTPS.
//
// When you test on a real phone over local Wi-Fi (http://<ip>:5173), the browser
// blocks the Geolocation API outside a secure context. For that case run
// `pnpm dev:https`, which sets HTTPS=true and serves a self-signed certificate.
// `host: true` exposes the dev server on the local network for the phone to reach.
// https://vitejs.dev/config/
const useHttps = process.env.HTTPS === 'true';

export default defineConfig({
  plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: useHttps,
    host: true,
    allowedHosts: ['.vercel.run'],
  },
});
