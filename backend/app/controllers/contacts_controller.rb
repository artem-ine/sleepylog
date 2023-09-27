class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      ContactMailer.contact_notification(@contact).deliver_now
      render json: { message: 'Contact form submitted successfully' }, status: :created
    else
      render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
