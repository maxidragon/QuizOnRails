class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers, dependent: :destroy
  validates :text, presence: true
end
