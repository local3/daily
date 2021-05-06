class DiaryContent < ApplicationRecord
  belongs_to :diary
  belongs_to :language
end
