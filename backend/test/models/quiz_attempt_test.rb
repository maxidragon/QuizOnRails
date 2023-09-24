require "test_helper"

class QuizAttemptTest < ActiveSupport::TestCase
  test "should not save quiz_attempt without user" do
    quiz_attempt = QuizAttempt.new
    assert_not quiz_attempt.save
  end

  test "should not save quiz_attempt with user, but without quiz" do
    quiz_attempt = QuizAttempt.new(user: User.first)
    assert_not quiz_attempt.save
  end

  test "should save quiz_attempt with user and quiz" do
    quiz_attempt = QuizAttempt.new(user: User.first, quiz: Quiz.first)
    assert quiz_attempt.save
  end
end
