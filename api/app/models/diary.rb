class Diary < ApplicationRecord
  belongs_to :user
  has_many :diary_contents
  validates :date, presence: true
end
