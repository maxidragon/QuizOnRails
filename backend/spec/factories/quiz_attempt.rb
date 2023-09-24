# spec/factories/quiz_attempts.rb

FactoryBot.define do
  factory :quiz_attempt do
    user
    quiz
    started_at { Time.now }
    finished_at { Time.now + 1.hour }
    is_active { true }
    score { 0 }
  end
end
