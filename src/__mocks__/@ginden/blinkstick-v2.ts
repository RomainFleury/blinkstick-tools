import { ColorObject } from "@ginden/blinkstick-v2";
import { HID } from "node-hid";

export interface BlinkStick {
  serial: string;
  ledCount: number;
  isSync: boolean;
  abortController: AbortController;
  defaultRetryCount: number;
  requiresSoftwareColorPatch: boolean;
  device: HID;
  manufacturer: string;
  product: string;
  versionMajor: number;
  versionMinor: number;
  setColor(
    color: ColorObject | string,
    options?: { index?: number }
  ): Promise<void>;
  getColor(index?: number): Promise<[number, number, number]>;
  getInfo(): Promise<any>;
  getMode(): Promise<any>;
  getLedCount(): Promise<number>;
  getSerial(): string;
  getManufacturer(): Promise<string>;
  getProduct(): Promise<string>;
  getVersion(): Promise<string>;
}

export class MockBlinkStick implements BlinkStick {
  serial: string = "BS019328-3.0";
  ledCount: number = 8;
  isSync: boolean = false;
  abortController: AbortController = new AbortController();
  defaultRetryCount: number = 3;
  requiresSoftwareColorPatch: boolean = false;
  device: HID = {} as HID;
  manufacturer: string = "Mock Manufacturer";
  product: string = "Mock Product";
  versionMajor: number = 1;
  versionMinor: number = 0;
  private colors: ColorObject[] = [];

  constructor() {
    this.colors = Array(this.ledCount).fill({ r: 0, g: 0, b: 0 });
  }

  async setColor(
    color: ColorObject | string,
    options?: { index?: number }
  ): Promise<void> {
    const colorObj =
      typeof color === "string" ? this.parseColorString(color) : color;
    if (options?.index !== undefined) {
      this.colors[options.index] = colorObj;
    } else {
      this.colors = Array(this.ledCount).fill(colorObj);
    }
  }

  private parseColorString(color: string): ColorObject {
    if (color === "black") {
      return { r: 0, g: 0, b: 0 };
    }
    // Add more color parsing if needed
    return { r: 0, g: 0, b: 0 };
  }

  async getColor(index?: number): Promise<[number, number, number]> {
    const color = this.colors[index ?? 0];
    return [color.r, color.g, color.b];
  }

  // Implement other required methods with empty implementations
  async getInfo(): Promise<any> {
    return {};
  }
  async getMode(): Promise<any> {
    return {};
  }
  async getLedCount(): Promise<number> {
    return this.ledCount;
  }
  getSerial(): string {
    return this.serial;
  }
  async getManufacturer(): Promise<string> {
    return this.manufacturer;
  }
  async getProduct(): Promise<string> {
    return this.product;
  }
  async getVersion(): Promise<string> {
    return `${this.versionMajor}.${this.versionMinor}`;
  }
}

export async function findFirstAsync(): Promise<MockBlinkStick | null> {
  return new MockBlinkStick();
}
