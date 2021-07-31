class Language < ApplicationRecord
  has_many :users
  has_many :diary_contents
  has_many :dictionaries
end
