import { getDevice, getTime, setColorForAllLeds, turnOff } from "./helpers";
import fetch from "node-fetch";
import https from "https";

const SERVER_URL = "https://localhost:3000/api/maintenance/status.json";
const CHECK_INTERVAL = 500; // Check every half second

// Create a custom HTTPS agent that ignores SSL certificate errors
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // WARNING: This is not secure for production use
});

async function checkServerStatus(): Promise<boolean> {
  try {
    const response = await fetch(SERVER_URL, { agent: httpsAgent });
    return response.ok;
  } catch (error) {
    console.error("Error checking server status:", error);
    return false;
  }
}

async function monitorServer() {
  try {
    const device = await getDevice();
    console.log("Found BlinkStick device:", device.serial);

    // Set initial state
    let isServerUp = false;
    await setColorForAllLeds(device, { r: 255, g: 0, b: 0 }, 100); // Start with red

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\nGracefully shutting down...");
      await turnOff(device, 100);
      process.exit(0);
    });

    // Main monitoring loop
    while (true) {
      const serverStatus = await checkServerStatus();

      if (serverStatus !== isServerUp) {
        isServerUp = serverStatus;
        if (isServerUp) {
          console.log(`[${getTime()}] Server is UP - Setting LEDs to green`);
          await setColorForAllLeds(device, { r: 0, g: 255, b: 0 }, 100);
        } else {
          console.log(`[${getTime()}] Server is DOWN - Setting LEDs to red`);
          await setColorForAllLeds(device, { r: 255, g: 0, b: 0 }, 100);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, CHECK_INTERVAL));
    }
  } catch (error) {
    console.error("Error in monitoring:", error);
    process.exit(1);
  }
}

monitorServer();
