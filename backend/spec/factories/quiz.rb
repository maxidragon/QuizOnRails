# spec/factories/quizzes.rb

FactoryBot.define do
  factory :quiz do
    name { Faker::Lorem.sentence }
    user
    description { Faker::Lorem.paragraph }
    is_public { true }
  end
end
