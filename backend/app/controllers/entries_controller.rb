class EntriesController < ActionController::API

  def index
    user = current_user 
    logbook = user.logbook
    entries = logbook.entries
    render json: entries
  end

  def create
    user = current_user

    if user.logbook.nil?
      logbook = Logbook.create(user: user)
    else
      logbook = user.logbook
    end

    entry = logbook.entries.create(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @logbook = Logbook.find(params[:logbook_id])
    @entry = @logbook.entries.find(params[:id])
    render json: @entry
  end

  def update
    @logbook = current_user.logbook
    @entry = @logbook.entries.find(params[:id])
    
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @logbook = current_user.logbook
    @entry = @logbook.entries.find(params[:id])
    @entry.destroy
    head :no_content
  end

  private

  def entry_params
    params.require(:entry).permit(:logbook_id, :start_time, :end_time, :duration, :rating, :notes) 
  end

end

# # Calculate the average rating for all entries
# average_rating = Entry.average(:rating)

# # Calculate the total count of entries with each rating
# rating_counts = Entry.group(:rating).count

# # Example output for rating_counts:
# # { "no_data" => 10, "horrible" => 5, "mediocre" => 20, "OK" => 30, "good" => 15, "perfect" => 25 }
