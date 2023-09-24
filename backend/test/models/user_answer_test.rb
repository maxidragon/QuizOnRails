require "test_helper"

class UserAnswerTest < ActiveSupport::TestCase
  test "should not save user_answer without quiz_attempt" do
    user_answer = UserAnswer.new
    assert_not user_answer.save
  end

  test "should not save user_answer with quiz_attempt, but without answer" do
    user_answer = UserAnswer.new(quiz_attempt: QuizAttempt.first)
    assert_not user_answer.save
  end

  test "should save user_answer with quiz_attempt and answer" do
    user_answer = UserAnswer.new(quiz_attempt: QuizAttempt.first, answer: Answer.first)
    assert user_answer.save
  end
end
