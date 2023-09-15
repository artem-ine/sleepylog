class LogbooksController < ActionController

  def index
    @logbooks = Logbook.all
    render json: @logbooks
  end

  def create
    @logbook = Logbook.new(logbook_params)
    
    if @logbook.save
      render json: @logbook, status: :created
    else
      render json: @logbook.errors, status: :unprocessable_entity
    end
  end

  def show
    @logbook = Logbook.find(params[:id])
    render json: @logbook
  end

  def update
    @logbook = Logbook.find(params[:id])
    
    if @logbook.update(logbook_params)
      render json: @logbook
    else
      render json: @logbook.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @logbook = Logbook.find(params[:id])
    @logbook.destroy
    head :no_content
  end

  private

  def logbook_params
    params.require(:logbook).permit(:user_id, :name) # Adjust this according to your logbook attributes
  end
end

end