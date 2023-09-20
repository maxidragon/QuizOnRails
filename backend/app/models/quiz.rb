class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true
  validates :is_public, presence: true
end
