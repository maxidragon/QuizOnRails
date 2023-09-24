require "rails_helper"

RSpec.describe Question, type: :model do
  it "is valid with valid attributes" do
    question = FactoryBot.build(:question)
    expect(question).to be_valid
  end

  it "is not valid without text" do
    question = FactoryBot.build(:question, text: nil)
    expect(question).not_to be_valid
  end

  it "belongs to a quiz" do
    association = described_class.reflect_on_association(:quiz)
    expect(association.macro).to eq(:belongs_to)
  end

  it "has many answers" do
    association = described_class.reflect_on_association(:answers)
    expect(association.macro).to eq(:has_many)
  end
end
