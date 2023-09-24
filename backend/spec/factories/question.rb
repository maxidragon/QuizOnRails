# spec/factories/questions.rb

FactoryBot.define do
  factory :question do
    text { Faker::Lorem.sentence }
    quiz
  end
end
