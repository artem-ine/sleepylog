class EntriesController < ActionController:API

  def index
    @logbook = Logbook.find(params[:logbook_id])
    @entries = @logbook.entries
    render json: @entries
  end

  def create
    @logbook = Logbook.find(params[:logbook_id])
    @entry = @logbook.entries.build(entry_params)
    
    if @entry.save
      render json: @entry, status: :created
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  def show
    @logbook = Logbook.find(params[:logbook_id])
    @entry = @logbook.entries.find(params[:id])
    render json: @entry
  end

  def update
    @logbook = Logbook.find(params[:logbook_id])
    @entry = @logbook.entries.find(params[:id])
    
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @logbook = Logbook.find(params[:logbook_id])
    @entry = @logbook.entries.find(params[:id])
    @entry.destroy
    head :no_content
  end

  private

  def entry_params
    params.require(:entry).permit(:logbook_id, :date, :duration, :quality, :notes) # Adjust this according to your entry attributes
  end

end