require "test_helper"

class AnswerTest < ActiveSupport::TestCase
  test "should not save answer without content" do
    answer = Answer.new
    assert_not answer.save
  end

  test "should not save answer with content, but without question" do
    answer = Answer.new(text: "test")
    assert_not answer.save
  end

  test "should save answer with content and question" do
    answer = Answer.new(text: "test", question: Question.first)
    assert answer.save
  end
end
