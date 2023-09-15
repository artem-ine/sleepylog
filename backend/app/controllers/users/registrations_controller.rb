class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      super do |resource|
        if resource.persisted?
          @logbook = Logbook.new(user: resource) 
          @logbook.save
        end
      end
    end

    def update
      super do |resource|
        if resource.errors.empty?
          render json: {
            message: 'Account updated successfully.',
            user: resource
          }, status: :ok
        else
          render json: { message: resource.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
      end
    end
  
    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username)
    end

    def account_update_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username)
    end

  
    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?
  
      register_failed
    end
  
    def register_success
      render json: {
        message: 'Signed up sucessfully.',
        user: current_user
      }, status: :ok
    end
  
    def register_failed
      render json: { message: 'Something went wrong.' }, status: :unprocessable_entity
    end
  end