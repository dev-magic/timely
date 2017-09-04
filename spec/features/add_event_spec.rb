require 'rails_helper'

RSpec.feature 'Add A New Event' do

  let(:location) { Location.create(name: "Coffee Bean and Tea Leaf", address: "925 Camino De La Reina C, San Diego, CA 92108") }
  let(:event) { Event.create(name: "Dev Magic", time: Datetime.now, duration_minutes: 30, location_id: location.id) }

  scenario "users can add a new event" do
    pending('Pending a merge')
    visit root_path

    click_button "Add Event"

    fill_in "Name", with: event.name
    fill_in "Time", with: event.time
    fill_in "Duration", with: event.duration_minutes
    fill_in "Location", with: location.name || location.address

    expect(page).to have_content "Event added Successfully."
    expect(page).to have_current_path events_path
  end

  scenario "users can not add a new event" do
    pending('Pending a merge')
    visit root_path

    click_button "Add Event"

    fill_in "Name", with: ""
    fill_in "Time", with: ""
    fill_in "Duration", with: ""
    fill_in "Location", with: ""

    expect(page).to have_content "Please fill in all required fields."
    expect(page).to have_current_path new_events_path
  end
end
