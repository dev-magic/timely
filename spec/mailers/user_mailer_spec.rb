require 'rails_helper'

RSpec.describe UserMailer, type: :mailer do

  describe 'confirmation email' do

    let(:user) { User.create(email: 'test@example.com', password: 'password') }
    let(:mail) { described_class.confirmation_instructions(user, 'faketoken', {}).deliver_now }

    it "renders the headers" do
      expect(mail.subject).to eq 'Confirmation instructions'
      expect(mail.to).to eq [user.email]
      expect(mail.from).to eq ['no-reply@letsmeetup.com'] 
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match 'Confirm my account'
    end

    it 'engages with a specific admin' do
      expect(mail.body.encoded)
        .to match user.email
    end
  end
end
