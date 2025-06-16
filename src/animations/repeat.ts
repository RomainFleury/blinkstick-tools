import { BlinkStick, ColorObject } from "@ginden/blinkstick-v2";
import { turnOff } from "../helpers";
import { wait } from "../helpers";
import { Animation, AnimationOptions } from "./animation.model";

export function repeat(options: AnimationOptions, animation: Animation) {
  let count = 0;
  const interval = setInterval(async () => {
    await animation.start();
    await wait(options.delay ?? 100);
    await animation.stop();
    await wait(options.delay ?? 100);
    count++;
    if (count >= (options.count ?? 1)) {
      clearInterval(interval);
    }
  }, options.delay ?? 100);
  return interval;
}

export function stopBlink(interval: NodeJS.Timeout) {
  clearInterval(interval);
}

export class Repeat extends Animation {
  private interval: NodeJS.Timeout | null = null;
  private animation: Animation;

  constructor(
    device: BlinkStick,
    color: ColorObject,
    options: AnimationOptions,
    animation: Animation
  ) {
    super(device, color, options);
    this.animation = animation;
  }

  async start() {
    this.interval = repeat(this.options, this.animation);
  }

  async stop() {
    if (this.interval) {
      stopBlink(this.interval);
    }
    turnOff(this.device);
  }

  async changeColor(color: ColorObject) {
    this.color = color;
    if (this.interval) {
      this.stop();
      this.start();
    }
  }
}
