import requests
import sys
import time
from blinkstick import blinkstick


def url_exists(url):
    """
    Check if the given URL really exists
    :param url: str
    :return: bool
    """
    try:
        response = requests.get(url, verify=False)
        print response
        # print response.status_code
        return True if response.status_code < 400 else False
    except:
        print 'An error occurred'
        return False


# BLINKSTICK PART
led = blinkstick.find_first()
if led is None:
    print "BlinkStick not found...\r\nExiting..."
else:
    led.set_mode(3)  # light up all leds at once

try:

    def setColor(color="#000000", pulse=False, blink=False):
        led = blinkstick.find_first()
        if pulse == True:
            led.pulse(hex=color)
            led.morph(hex=color)
        else:
            if blink == True:
                led.blink(hex=color, repeats=10)
                led.morph(hex=color)
            else:
                led.morph(hex=color)

    while True:
        if url_exists(sys.argv[1]):
            setColor("#003300")
        else:
            setColor("#ff0000", False, True)
        # Wait for 5 seconds
        time.sleep(5)

except KeyboardInterrupt:
    led = blinkstick.find_first()
    led.turn_off()
