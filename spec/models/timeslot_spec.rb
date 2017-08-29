require 'rails_helper'

RSpec.describe Timeslot, type: :model do
  let!(:event) { Event.create(name: "dev magic", time: DateTime.now, duration_minutes: 5, id: 1)}

  subject {
    described_class.new(start_time: DateTime.now, event_id: 1)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without a start_time" do
    subject.start_time = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should belong_to(:event) }
    it { should have_many(:preferences) }
  end

  describe "Associations" do
    it "belongs to event" do
      assc = described_class.reflect_on_association(:event)
      expect(assc.macro).to eq :belongs_to
    end

    it "has many preferences" do
      assc = described_class.reflect_on_association(:preferences)
      expect(assc.macro).to eq :has_many
    end
  end
end
