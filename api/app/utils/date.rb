require 'date'
def days
  ['日','月','火','水','木','金','土']
end

def getJaDay(date)
  logger.debug date
  days[date.wday]
end