import socket
import time
from blinkstick import blinkstick

"""
This functions checks connection to Google DNS server
If DNS server is reachable on port 53, then it means that
the internet is up and running
"""
def internet_connected(host="8.8.8.8", port=53):
  # """
  # Host: 8.8.8.8 (google-public-dns-a.google.com)
  # OpenPort: 53/tcp
  # Service: domain (DNS/TCP)
  # """
  print "Checking host " + host
  try:
    socket.setdefaulttimeout(1)
    socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
    return True
  except Exception as ex:
    pass

  return False

# Find first BlinkStick
led = blinkstick.find_first()
# # Find all BlinkStick
# leds = blinkstick.find_all()

# # # Can't do anything if BlinkStick is not connected
# if leds is None:
#   print "BlinkStick not found...\r\nExiting..."
# else:
#   for ledd in leds:
#     ledd.set_color(name="random")

# Can't do anything if BlinkStick is not connected
if led is None:
  print "BlinkStick not found...\r\nExiting..."
else:
  try:
    # Store value of last state in this variable
    connected = False
    
# https://romain.in/vui/config.json
#  port 443
    host = "https://romain.in/vui/config.json"
    port = 443
    
    while (True):
      if internet_connected(host, port):
        # If previously internet was disconnected, then print message
        # and set BlinkStick to green
        if not connected:
          print "Internet is up!"
          connected = True
          led.set_color(name="green")

        # Wait for 1 second before checking for internet connectivity
        time.sleep(1)
      else:
        # If previously internet connected, then print message
        if connected:
          print "Internet is down..."
          connected = False

        # BlinkStick pulse API call lasts for 1 second so this acts
        # as delay before next check for internet is performed
        led.pulse(name="red")
  except KeyboardInterrupt:
    print "Exiting... Bye!"

  led.turn_off()