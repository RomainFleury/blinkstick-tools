import { BlinkStick, ColorObject } from "@ginden/blinkstick-v2";

export interface Animation {
  device: BlinkStick;
  color: ColorObject;
  options: AnimationOptions;
  callBack?: () => void;
}

export interface AnimationOptions {
  speed?: number; // speed of the animation in milliseconds
  delay?: number; // delay between each frame in milliseconds
  count?: number; // number of times to repeat the animation
  only?: number[]; // specific indices of leds to animate
}

export abstract class Animation {
  device: BlinkStick;
  color: ColorObject;
  options: AnimationOptions;
  callBack?: () => void;

  constructor(
    device: BlinkStick,
    color: ColorObject,
    options: AnimationOptions,
    callBack?: () => void
  ) {
    this.device = device;
    this.color = color;
    this.options = options;
    this.callBack = callBack;
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract changeColor(color: ColorObject): Promise<void>;
}
