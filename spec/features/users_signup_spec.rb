require 'rails_helper'

RSpec.describe "Users can sign up", js: true do

  scenario "#success" do

    visit root_path

    within 'div.auth-bar' do
      click_button "Sign Up"
    end

    expect(page).to have_current_path new_user_registration_path

    fill_in "Name", with: "Dev Magic"
    fill_in "Email", with: "devmagic@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"

    within '.actions' do
      click_button "Sign up"
    end

    expect(page).to have_current_path events_path
    expect(page).to have_content "You have signed up successfully."

  end

  scenario "#failure" do
    visit root_path

    within 'div.auth-bar' do
      click_button "Sign Up"
    end

    expect(page).to have_current_path new_user_registration_path

    fill_in "Name", with: ""
    fill_in "Email", with: ""
    fill_in "Password", with: ""
    fill_in "Password confirmation", with: ""

    within '.actions' do
      click_button "Sign up"
    end

    expect(page).to have_current_path user_registration_path 
    expect(page).to have_content " errors prohibited this user from being saved:"

  end
end
