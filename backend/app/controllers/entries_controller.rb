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
    @logbook = current_user.logbook
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

  def sleep_duration_custom_range
    user = current_user
    start_date = params[:start_date]
    end_date = params[:end_date]

    if start_date.blank? || end_date.blank?
      render json: { error: "Both start_date and end_date are required." }, status: :unprocessable_entity
      return
    end

    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)

    logbook = user.logbook
    entries = logbook.entries.where(start_time: start_date.beginning_of_day..end_date.end_of_day)

    total_duration = entries.sum(:duration)
    
    render json: { total_duration: total_duration }
  end

  def sleep_duration_past_week
    if current_user.nil?
      render json: { error: "Current user not found." }, status: :not_found
      return
    end

    @logbook = current_user.logbook

    if @logbook.nil?
      render json: { error: "Logbook not found for the current user" }, status: :not_found
      return
    end

    @entries = @logbook.entries
    one_week_ago = 1.week.ago
    total_duration = @entries.where("start_time >= ? AND start_time <= ?", one_week_ago, Time.now).sum(:duration)
    render json: { total_duration: total_duration }
  end


  def sleep_duration_past_month
    if current_user.nil?
      render json: { error: "Current user not found." }, status: :not_found
      return
    end

    @logbook = current_user.logbook

    if @logbook.nil?
      render json: { error: "Logbook not found for the current user" }, status: :not_found
      return
    end

    @entries = @logbook.entries
    one_month_ago = 1.month.ago
    total_duration = @entries.where("start_time >= ? AND start_time <= ?", one_month_ago, Time.now).sum(:duration)
    render json: { total_duration: total_duration }
  end


  def average_rating_past_week
    if current_user.nil?
      render json: { error: "Current user not found." }, status: :not_found
      return
    end

    @logbook = current_user.logbook

    if @logbook.nil?
      render json: { error: "Logbook not found for the current user" }, status: :not_found
      return
    end

    one_week_ago = 1.week.ago
    average_rating = @logbook.entries.where("start_time >= ? AND start_time <= ?", one_week_ago, Time.now).average(:rating)

    if average_rating.nil?
      render json: { average_rating: "No data available for the past" }
    else
      average_rating = average_rating.round(2)
      render json: { average_rating: average_rating }
    end
  end

  
  def average_rating_past_month
    if current_user.nil?
      render json: { error: "Current user not found." }, status: :not_found
      return
    end

    @logbook = current_user.logbook

    if @logbook.nil?
      render json: { error: "Logbook not found for the current user" }, status: :not_found
      return
    end

    one_month_ago = 1.month.ago
    average_rating = @logbook.entries.where("start_time >= ? AND start_time <= ?", one_month_ago, Time.now).average(:rating)

    if average_rating.nil?
      render json: { average_rating: "No data available for the past" }
    else
      average_rating = average_rating.round(2)
      render json: { average_rating: average_rating }
    end
  end


  private

  def entry_params
    params.require(:entry).permit(:logbook_id, :start_time, :end_time, :duration, :rating, :notes) 
  end

end

