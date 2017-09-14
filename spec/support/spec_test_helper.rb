def last_email
  ActionMailer::Base.deliveries.last
end

def sign_in_user(user)
  confirm_account

  fill_in "Email", with: user.email
  fill_in "Password", with: user.password

  within '.actions' do
    click_button "Log in"
  end
end

def confirm_account
  body = last_email.parts.find {|p| p.content_type.match(/text/)}.body
  confirm = body.match(/confirmation_token=[^"]+/)
  visit "/users/confirmation?#{confirm}"
end
