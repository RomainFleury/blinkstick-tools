
from blinkstick import blinkstick

# Find first BlinkStick
leds = blinkstick.find_all()

# Can't do anything if BlinkStick is not connected
if leds is None:
  print "BlinkStick not found...\r\nExiting..."
else:
  for led in leds:
    led.turn_off()