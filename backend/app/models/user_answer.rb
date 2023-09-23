class UserAnswer < ApplicationRecord
  belongs_to :quiz_attempt
  belongs_to :answer
end
