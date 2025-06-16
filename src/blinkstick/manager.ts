import { BlinkStick } from "@ginden/blinkstick-v2";
import { getDevice, turnOff } from "../helpers";

export class BlinkStickManager {
  private device: BlinkStick | null = null;
  private ledsCount: number | null = null;

  constructor() {
    this.getDevice();
  }

  async getDevice() {
    try {
      if (this.device?.getMode()) {
        return this.device;
      }
      this.device = await getDevice();
      this.ledsCount = this.device?.ledCount;
      return this.device;
    } catch (error) {
      console.error(error);
      this.device = await getDevice();
      this.ledsCount = this.device?.ledCount;
      return this.device;
    }
  }

  async turnOff() {
    if (this.device) {
      await turnOff(this.device);
    }
  }
}
