import pycurl


def url_exists(url):
  """
  Check if the given URL really exists
  :param url: str
  :return: bool
  """
  c = pycurl.Curl()
  c.setopt(pycurl.NOBODY, True)
  c.setopt(pycurl.FOLLOWLOCATION, False)
  c.setopt(pycurl.CONNECTTIMEOUT, 10)
  c.setopt(pycurl.TIMEOUT, 10)
  c.setopt(pycurl.COOKIEFILE, '')
  c.setopt(pycurl.SSL_VERIFYPEER, 0)
  c.setopt(pycurl.SSL_VERIFYHOST, 0)
  c.setopt(pycurl.URL, url)
  try:
    c.perform()
    response_code = c.getinfo(pycurl.RESPONSE_CODE)
    c.close()
    return True if response_code < 400 else False
  except pycurl.error as err:
    errno, errstr = err
    raise OSError('An error occurred: {}'.format(errstr))
if url_exists("https://romain.in/index.html"):
  print "ok"
else:
  print "ko"
