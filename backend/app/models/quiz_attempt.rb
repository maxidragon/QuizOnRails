class QuizAttempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :user_answers, dependent: :destroy
end
