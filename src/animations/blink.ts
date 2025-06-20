import { BlinkStick, ColorObject } from "@ginden/blinkstick-v2";
import { setColorForAllLeds, turnOff } from "../helpers";
import { wait } from "../helpers";
import { Animation } from "./animation.model";

export function blink(
  device: BlinkStick,
  color: ColorObject,
  delay: number = 100,
  count: number = 1,
  callBack?: () => void
) {
  return setInterval(async () => {
    await setColorForAllLeds(device, color);
    await wait(delay);
    await setColorForAllLeds(device, { r: 0, g: 0, b: 0 });
    await wait(delay);
    callBack?.();
  }, delay * count);
}

export function stopBlink(interval: NodeJS.Timeout) {
  clearInterval(interval);
}

export class Blink extends Animation {
  private interval: NodeJS.Timeout | null = null;

  async start() {
    if (this.interval) {
      stopBlink(this.interval);
    }
    this.interval = blink(
      this.device,
      this.color,
      this.options.delay,
      this.options.count,
      this.callBack
    );
  }

  async stop() {
    if (this.interval) {
      stopBlink(this.interval);
      this.callBack?.();
      turnOff(this.device);
    }
  }

  async changeColor(color: ColorObject) {
    this.color = color;
    await this.stop();
    await this.start();
  }
}
