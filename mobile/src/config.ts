// Server configuration
// Update SERVER_IP to your Mac's local IP address when testing on a physical device
// Find your IP with: ipconfig getifaddr en0

export const CONFIG = {
  // For iOS Simulator, use localhost
  // For Android Emulator, use 10.0.2.2
  // For physical device, use your Mac's local IP (e.g., '192.168.1.100')
  SERVER_IP: 'localhost',
  WS_PORT: 3002,

  get WS_URL() {
    return `ws://${this.SERVER_IP}:${this.WS_PORT}`;
  },
};
