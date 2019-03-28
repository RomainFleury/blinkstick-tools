import pycurl
import sys
import time
from blinkstick import blinkstick

# if len(sys.argv[1]) == 0:
#     print "please give an url as argument"
#     sys.exit()


def url_exists(url):
    """
    Check if the given URL really exists
    :param url: str
    :return: bool
    """
    print "checking " + url
    c = pycurl.Curl()
    c.setopt(pycurl.NOBODY, True)
    c.setopt(pycurl.FOLLOWLOCATION, False)
    c.setopt(pycurl.CONNECTTIMEOUT, 10)
    c.setopt(pycurl.TIMEOUT, 10)
    c.setopt(pycurl.SSL_VERIFYPEER, 0)
    c.setopt(pycurl.SSL_VERIFYHOST, 0)
    c.setopt(pycurl.URL, url)
    try:
        c.perform()
        response_code = c.getinfo(pycurl.RESPONSE_CODE)
        c.close()
        print response_code
        return True if response_code < 400 else False
    except pycurl.error as err:
        errstr = err
        # raise OSError('An error occurred: {}'.format(errstr))
        print 'An error occurred: {}'.format(errstr)


# BLINKSTICK PART
led = blinkstick.find_first()
if led is None:
    print "BlinkStick not found...\r\nExiting..."
else:
    led.set_mode(3)


def setColor(color, effect=""):
    led = blinkstick.find_first()
    led.set_color(name=color)


while True:
    if url_exists(sys.argv[1]):
        print "ok"
        setColor("green")
    else:
        print "ko"
        setColor("red")
    # Wait for 5 seconds
    time.sleep(5)
