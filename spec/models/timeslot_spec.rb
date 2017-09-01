require 'rails_helper'

RSpec.describe Timeslot, type: :model do
  let!(:location) { Location.create(name: "dev magic", address: "555 Drury lane" ) }
  let!(:event) { Event.create(name: "dev magic", time: DateTime.now, duration_minutes: 30, location_id: location.id)}

  subject {
    described_class.new(start_time: DateTime.now, event_id: event.id)
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
end
