import { BlinkStick, ColorObject } from "@ginden/blinkstick-v2";

export interface Animation {
  device: BlinkStick;
  color: ColorObject;
  options: AnimationOptions;
}

export interface AnimationOptions {
  speed?: number;
  delay?: number;
  count?: number;
}

export abstract class Animation {
  device: BlinkStick;
  color: ColorObject;
  options: AnimationOptions;

  constructor(
    device: BlinkStick,
    color: ColorObject,
    options: AnimationOptions
  ) {
    this.device = device;
    this.color = color;
    this.options = options;
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract changeColor(color: ColorObject): Promise<void>;
}
