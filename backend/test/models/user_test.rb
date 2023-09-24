require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without email" do
    user = User.new
    assert_not user.save
  end

  test "should not save user with email, but without password" do
    user = User.new(email: "test@test.pl")
    assert_not user.save
  end
end
