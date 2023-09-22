class UserMailer < Devise::Mailer
  default from: 'sleepylog.kz@gmail.com'
  default template_path: 'users/mailer'
  
  def welcome_email(user)
    @user = user

    mail(to: @user.email, subject: 'Bienvenue !')
  end

  def reset_password_instructions(record, token, opts={})
    super
  end


end