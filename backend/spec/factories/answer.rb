# spec/factories/answers.rb

FactoryBot.define do
  factory :answer do
    text { Faker::Lorem.word }
    is_correct { [true, false].sample }
    question
  end
end
