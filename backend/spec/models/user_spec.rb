require "rails_helper"

RSpec.describe User, type: :model do
  it "has many quizzes" do
    association = described_class.reflect_on_association(:quizzes)
    expect(association.macro).to eq(:has_many)
  end

  it "has many quiz attempts" do
    association = described_class.reflect_on_association(:quiz_attempts)
    expect(association.macro).to eq(:has_many)
  end

  # Przykład testu dla autentykacji Devise
  it "is valid with valid attributes" do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = FactoryBot.build(:user, email: nil)
    expect(user).not_to be_valid
  end
end
