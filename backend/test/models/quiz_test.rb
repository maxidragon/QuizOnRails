require "test_helper"

class QuizTest < ActiveSupport::TestCase
  test "should not save quiz without name" do
    quiz = Quiz.new
    assert_not quiz.save
  end

  test "should not save quiz without user_id" do
    quiz = Quiz.new(name: "test")
    assert_not quiz.save
  end

  test "should save quiz with name, description and user" do
    quiz = Quiz.new(name: "test", description: "test", user: User.first)
    assert quiz.save
  end
end
