require "rails_helper"

RSpec.describe QuizAttempt, type: :model do
  it "belongs to a user" do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq(:belongs_to)
  end

  it "belongs to a quiz" do
    association = described_class.reflect_on_association(:quiz)
    expect(association.macro).to eq(:belongs_to)
  end

  it "has many user answers" do
    association = described_class.reflect_on_association(:user_answers)
    expect(association.macro).to eq(:has_many)
  end
end
