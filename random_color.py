
from blinkstick import blinkstick

# Find first BlinkStick
leds = blinkstick.find_all()

# Can't do anything if BlinkStick is not connected
if leds is None:
  print("BlinkStick not found...\r\nExiting...")
else:
  for led in leds:
    # BlinkStick Square and Strip has mode 3 which sets color to all LEDs at once by using a single SetColor function call. 
    led.set_mode(3)
    led.set_color(name="random")