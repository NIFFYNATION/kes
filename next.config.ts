import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * LAN hosts allowed to request dev resources, so the site can be opened
   * from a phone on the same network. The machine's IP changes between
   * networks — add the new one here if HMR gets blocked again.
   */
  allowedDevOrigins: ["192.168.251.63", "192.168.35.63"],
};

export default nextConfig;
