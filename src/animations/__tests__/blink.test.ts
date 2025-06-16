import { MockBlinkStick } from "../../__mocks__/@ginden/blinkstick-v2";
import { Blink } from "../blink";
import { MAX_BRIGHTNESS, wait } from "../../helpers";

jest.useFakeTimers();

function calculateColor(colorValue: number) {
  return Math.floor(colorValue * MAX_BRIGHTNESS);
}

describe("Blink Animation", () => {
  let device: MockBlinkStick;
  let blink: Blink;

  beforeEach(() => {
    device = new MockBlinkStick();
    blink = new Blink(
      device as any,
      { r: 255, g: 0, b: 0 },
      { delay: 1000, count: 2, speed: 1000 }
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should start blinking with the specified color", async () => {
    await blink.start();

    // Fast-forward time to check the color changes
    // jest.advanceTimersByTime(2000);
    const color1 = await device.getColor(0);
    expect(color1).toEqual([calculateColor(255), 0, 0]);

    // jest.advanceTimersByTime(1000);
    const color2 = await device.getColor(0);
    expect(color2).toEqual([0, 0, 0]);
  });

  it("should stop blinking and turn off all LEDs when stopped", async () => {
    await blink.start();
    await blink.stop();

    // Check if all LEDs are off
    for (let i = 0; i < device.ledCount; i++) {
      const color = await device.getColor(i);
      expect(color).toEqual([0, 0, 0]);
    }
  });

  it("should change color when requested", async () => {
    await blink.start();
    const newColor = { r: 0, g: 255, b: 0 };

    await blink.changeColor(newColor);

    // Fast-forward time to check the new color
    jest.advanceTimersByTime(100);
    const color = await device.getColor(0);
    expect(color).toEqual([0, calculateColor(255), 0]);
  });
});
