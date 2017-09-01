require 'rails_helper'

RSpec.describe Location, type: :model do
  subject {
      described_class.new(name: "Dev Magic", address: "255 Drury Lane, San Diego, CA")
    }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is invalid without an address" do
    subject.address = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should have_many(:events) }
  end 
end
