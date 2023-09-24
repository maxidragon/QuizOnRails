class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :quiz_attempts, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true
end
