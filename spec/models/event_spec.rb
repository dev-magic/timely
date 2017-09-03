require 'rails_helper'

RSpec.describe Event, type: :model do
  let!(:location) { Location.create(name: "dev magic", address: "555 Drury lane" ) }

  subject {
    described_class.new(name: "dev magic", time: DateTime.now, duration_minutes: 5, location_id: location.id)
  } 

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is valid without a time" do
    subject.time = nil
    expect(subject).to be_valid
  end

  it "is invalid without a duration" do
    subject.duration_minutes = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should have_many(:events_users) }
    it { should have_many(:users) }
    it { should have_many(:timeslots) }
    it { should belong_to(:location) }
  end
end
