class Diary < ApplicationRecord
  belongs_to :user
  has_many :diary_contents
end
