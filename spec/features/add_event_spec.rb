require 'rails_helper'

RSpec.feature 'Add A New Event', js: true do

  let(:user) { User.new(
                        name: "John",
                        email: "j@n.com",
                        password: "123456"
                        ) }

  before(:each) do
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    visit events_path
    click_on "Create New Event"
  end

  scenario "users can add a new event" do
    fill_in "name", with: Faker::Name.name
    fill_in "durationMinutes", with: rand(30..300)
    fill_in "locationName", with: Faker::Address.community
    fill_in "locationAddress", with: Faker::Address.street_address

    click_on "Submit"

    expect(page).to have_css ".event-container"
    expect(page).to have_css ".event__header"
  end

  scenario "users can not add a new event" do
    fill_in "durationMinutes", with: 5

    click_on "Submit"

    expect(page).to have_content 'Event Name is Required'
    expect(page).to have_content 'Duration Must Be at Least 15 Min'
    expect(page).to have_content 'If Creating New Location, Name and Address Are Required'
    expect(page).to have_current_path new_event_path
  end
end
