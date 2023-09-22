# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => 'apikey',
  :password => "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",
  :domain => 'monsite.fr',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}