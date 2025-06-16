import { BlinkStick, ColorObject, findFirstAsync } from "@ginden/blinkstick-v2";

const DEVICE_SERIAL = "BS019328-3.0";
const DEVICE_LED_COUNT = 8;

export const MAX_BRIGHTNESS = 0.5; // 50%

export async function getDevice() {
  const device = await findFirstAsync();
  if (device) {
    console.log("Found BlinkStick device:", device.serial);
    if (device.serial === DEVICE_SERIAL) {
      device.ledCount = DEVICE_LED_COUNT;
    }
    return device;
  }
  throw new Error("No BlinkStick device found");
}

export async function turnOff(device: BlinkStick, delay: number = 100) {
  for (let i = 0; i < device.ledCount; i++) {
    await device.setColor("black", { index: i });
    await wait(delay);
  }
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomColor(maxBrightness: number = 255): ColorObject {
  const color1 = Math.floor(Math.random() * maxBrightness);
  const color2 = Math.floor(Math.random() * maxBrightness);
  const color3 = Math.floor(Math.random() * maxBrightness);
  // rtgb -= random sort of colors
  const [r, g, b] = [color1, color2, color3].sort(randomSort);
  return {
    r,
    g,
    b,
  };
}

export async function setColorForAllLeds(
  device: BlinkStick,
  color: ColorObject,
  delay: number = 0
) {
  for (let i = 0; i < device.ledCount; i++) {
    await device.setColor(normalizeColor(color), { index: i });
    await wait(delay);
  }
}

function normalizeColor(color: ColorObject) {
  return {
    r: Math.floor(color.r * MAX_BRIGHTNESS),
    g: Math.floor(color.g * MAX_BRIGHTNESS),
    b: Math.floor(color.b * MAX_BRIGHTNESS),
  };
}

function randomSort(a: number, b: number) {
  return Math.random() - 0.5;
}

export function getTime() {
  return new Date().toISOString().split("T")[1].split(".")[0];
}
