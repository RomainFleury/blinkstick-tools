import { findFirstAsync } from "@ginden/blinkstick-v2";
import { AnimationBuilder } from "@ginden/blinkstick-v2";
import { getDevice, turnOff, wait } from "./helpers";

(async () => {
  const device = await getDevice();

  await wait(1000);
  console.log("Turning off...");
  await turnOff(device);
})();
