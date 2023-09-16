class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: { message: "Yeppa you did it" }
  end
end
