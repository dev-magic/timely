require 'rails_helper'

RSpec.describe Preference, type: :model do
  let!(:user) { User.create(name: "dev magic", email: "me@example.com", password: "password")}
  let!(:location) { Location.create(name: "dev magic", address: "555 Drury lane" ) }
  let!(:event) { Event.create(name: "dev magic", time: DateTime.now, duration_minutes: 30, location_id: location.id)}
  let!(:timeslot) { Timeslot.create(start_time: DateTime.now, event_id: event.id)}
  
  subject {
    described_class.new(preference_type: 3, timeslot_id: timeslot.id, user_id: user.id)
  }

  it "is valid with atrributes" do
    expect(subject).to be_valid
  end

  it "is invalid without a preference type" do
    subject.preference_type = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should belong_to(:user) }
    it { should belong_to(:timeslot) }
  end
end
