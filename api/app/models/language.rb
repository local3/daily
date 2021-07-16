class Language < ApplicationRecord
  has_many :users
  has_many :diary_contents
end
