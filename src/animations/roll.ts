import { BlinkStick, ColorObject } from "@ginden/blinkstick-v2";
import { setColorForAllLeds, turnOff } from "../helpers";
import { wait } from "../helpers";
import { Animation, AnimationOptions } from "./animation.model";

export async function roll(
  device: BlinkStick,
  color: ColorObject,
  speed: number = 100,
  interval: number = 10
) {
  for (let i = 0; i < device.ledCount; i++) {
    await device.setColor(color, { index: i });
    await wait(speed);
    await device.setColor("black", { index: i });
    await wait(interval);
  }
}

export class Roll extends Animation {
  async start() {
    roll(this.device, this.color, this.options.speed, this.options.delay);
  }

  async stop() {
    turnOff(this.device);
  }

  async changeColor(color: ColorObject) {
    this.color = color;
    await this.stop();
    await this.start();
  }
}
