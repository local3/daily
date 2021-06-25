# Dir[Rails.root.join("app/models/*.rb")].sort.each { |f| require f }
# def check_exist?(model, column, value)
#   logger.debug("\n\n\nbool")
#   model.constantize.exists?("#{column}": value)
# end