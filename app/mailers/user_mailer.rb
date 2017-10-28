class UserMailer < Devise::Mailer
  helper :application # access to all helpers defined within application_helper
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'

  # placeholder email
  default from: 'no-reply@timely.com'

  def confirmation_instructions(record, token, opts = {})
    image = File.read(Rails.root.join('public', 'images', 'norris_email.jpg'))
    attachments.inline['norris_email.jpg'] = image
    headers['Custom-header'] = 'Welcome to our site'
    opts[:from] = 'no-reply@timely.com'
    super
  end
end
