require 'rails_helper'

RSpec.describe "Users can sign out", js: true do

  let(:user) { User.create(name: "dev magic", email: "me@example.com", password: "password") }

  before(:each) do
    sign_in_user user
  end

  scenario "signout from root path" do

    expect(page).to have_current_path events_path
    expect(page).to_not have_content "Sign In"
    expect(page).to_not have_content "Sign Up"
    expect(page).to have_content "Hello, dev magic!"

    find(".greeting").click

    click_on "Sign Out"

    expect(page).to have_current_path root_path
    expect(page).to have_content "Sign In"
    expect(page).to have_content "Sign Up"

  end

  scenario "signout from /events path" do

    visit events_path

    expect(page).to_not have_content "Sign In"
    expect(page).to_not have_content "Sign Up"
    expect(page).to have_content "Hello, dev magic!"

    find(".greeting").click

    click_on "Sign Out"

    expect(page).to have_current_path root_path
    expect(page).to have_content "Sign In"
    expect(page).to have_content "Sign Up"

  end
end
