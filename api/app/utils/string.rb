def removeHeadZero(value)
  str = value.to_s.sub(/^0/, "")
  # if str.match(/^0\d/)
  #   str.sub(/^0/, "")
  # else
  #   str
  # end
end