class ContactMailer < ApplicationMailer
  default from: 'sleepylog.kz@gmail.com'
  default template_path: 'contact/mailer'
  
  def contact_notification(contact)
    @contact = contact

    mail(to: 'sleepylog.kz@gmail.com', subject: 'New Contact Form Submission') do |format|
      format.html { render 'contact_notification' }
    end
  end

end