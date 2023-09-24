require "rails_helper"

RSpec.describe UserAnswer, type: :model do
  it "belongs to a quiz attempt" do
    association = described_class.reflect_on_association(:quiz_attempt)
    expect(association.macro).to eq(:belongs_to)
  end

  it "belongs to an answer" do
    association = described_class.reflect_on_association(:answer)
    expect(association.macro).to eq(:belongs_to)
  end
end
