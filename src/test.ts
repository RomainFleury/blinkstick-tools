import { getDevice, turnOff, wait, randomColor } from "./helpers";

(async () => {
  const device = await getDevice();

  console.log("Found BlinkStick device:", device.serial);

  console.log(device.deviceDescription);
  console.log(device.ledCount);
  for (let i = 0; i < device.ledCount; i++) {
    await device.setColor(randomColor(30), { index: i });
    await wait(100);
  }

  await wait(1000);
  console.log("Rainbow pattern set!");
  await turnOff(device, 100);
})();
