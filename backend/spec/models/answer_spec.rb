require "rails_helper"

RSpec.describe Answer, type: :model do
  it "is valid with valid attributes" do
    answer = FactoryBot.build(:answer) # Utwórz obiekt Answer za pomocą FactoryBot lub innego narzędzia do tworzenia testowych obiektów
    expect(answer).to be_valid
  end

  it "is not valid without text" do
    answer = FactoryBot.build(:answer, text: nil)
    expect(answer).not_to be_valid
  end

  it "belongs to a question" do
    association = described_class.reflect_on_association(:question)
    expect(association.macro).to eq(:belongs_to)
  end
end
