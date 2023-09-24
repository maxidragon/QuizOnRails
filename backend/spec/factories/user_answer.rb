# spec/factories/user_answers.rb

FactoryBot.define do
  factory :user_answer do
    quiz_attempt
    answer
  end
end
