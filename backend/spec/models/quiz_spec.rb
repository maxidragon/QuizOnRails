require "rails_helper"

RSpec.describe Quiz, type: :model do
  it "belongs to a user" do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq(:belongs_to)
  end

  it "has many questions" do
    association = described_class.reflect_on_association(:questions)
    expect(association.macro).to eq(:has_many)
  end

  it "has many quiz attempts" do
    association = described_class.reflect_on_association(:quiz_attempts)
    expect(association.macro).to eq(:has_many)
  end

  it "is valid with valid attributes" do
    quiz = FactoryBot.build(:quiz)
    expect(quiz).to be_valid
  end

  it "is not valid without a name" do
    quiz = FactoryBot.build(:quiz, name: nil)
    expect(quiz).not_to be_valid
  end

  it "is not valid without a description" do
    quiz = FactoryBot.build(:quiz, description: nil)
    expect(quiz).not_to be_valid
  end
end
