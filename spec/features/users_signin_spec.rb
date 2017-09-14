require 'rails_helper'


RSpec.describe "Users can sign in", js: true do

  let(:user) { User.create(name: "dev magic", email: "me@example.com", password: "password") }

  scenario "#success" do

    visit root_path

    within '.auth-bar' do
      click_button "Sign In"
    end

    expect(page).to have_current_path new_user_session_path

    fill_in "Email", with: user.email
    fill_in "Password", with: user.password

    within '.actions' do
      click_button "Log in"
    end

    expect(page).to have_current_path root_path
    expect(page).to have_content "Signed in successfully."

  end

  scenario "#failure" do

    visit root_path

    within '.auth-bar' do
      click_button "Sign In"
    end

    expect(page).to have_current_path new_user_session_path

    fill_in "Email", with: ""
    fill_in "Password", with: ""

    within '.actions' do
      click_button "Log in"
    end

    expect(page).to have_current_path new_user_session_path
    expect(page).to have_content "Invalid Email or password."

  end
end
