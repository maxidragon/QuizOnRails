require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  test "should not save question without quiz_id" do
    question = Question.new(text: "test")
    assert_not question.save
  end

  test "should not save question without text" do
    question = Question.new(quiz: Quiz.first)
    assert_not question.save
  end

  test "should save question with text and quiz" do
    question = Question.new(text: "test", quiz: Quiz.first)
    assert question.save
  end
end
