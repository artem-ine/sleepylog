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

    one_week_ago = 1.week.ago
    end_time = Time.now
    dates = (one_week_ago.to_date..end_time.to_date).to_a

    sleep_data = Hash.new(0) # Initialize a hash with default values of 0
    total_duration = 0

    dates.each do |date|
      entries_on_date = @logbook.entries.where(start_time: date.beginning_of_day..date.end_of_day)
      daily_duration = entries_on_date.sum(:duration)
      sleep_data[date.strftime("%A")] += daily_duration # Use day name as label and accumulate duration
      total_duration += daily_duration # Accumulate total duration
    end

    render json: { sleep_data: sleep_data, total_duration: total_duration }
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

    one_month_ago = 1.month.ago
    end_time = Time.now
    dates = (one_month_ago.to_date..end_time.to_date).to_a
    total_duration = 0 # Initialize total_duration to 0

    sleep_data = Hash.new(0) # Initialize a hash with default values of 0

    current_week_start = nil
    current_week_end = nil

    dates.each do |date|
      if current_week_start.nil?
        current_week_start = date
      end

      current_week_end = date

      # Check if a week has ended
      if current_week_end.end_of_week(:sunday) == date
        entries_in_week = @logbook.entries.where(start_time: current_week_start.beginning_of_day..current_week_end.end_of_day)
        total_duration_in_week = entries_in_week.sum(:duration)

        # Accumulate sleep hours for each week
        total_duration += total_duration_in_week

        week_label = "#{current_week_start.strftime('%B %d')} - #{current_week_end.strftime('%B %d')}"
        sleep_data[week_label] = total_duration_in_week
        current_week_start = nil
      end
    end

    # Check if there's an ongoing week at the end of the month
    if current_week_start && current_week_end
      entries_in_week = @logbook.entries.where(start_time: current_week_start.beginning_of_day..current_week_end.end_of_day)
      total_duration_in_week = entries_in_week.sum(:duration)

      # Accumulate sleep hours for the last week
      total_duration += total_duration_in_week

      week_label = "#{current_week_start.strftime('%B %d')} - #{current_week_end.strftime('%B %d')}"
      sleep_data[week_label] = total_duration_in_week
    end

    render json: { sleep_data: sleep_data, total_duration: total_duration }
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
    filtered_entries = @logbook.entries
      .where("start_time >= ? AND start_time <= ? AND rating != ?", one_week_ago, Time.now, 0)

    ratings_data = filtered_entries
      .group(:rating)
      .count

    average_rating = filtered_entries
      .average(:rating)

    average_rating = average_rating.round(2)
    render json: { ratings_count: ratings_data, average_rating: average_rating }
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
    filtered_entries = @logbook.entries
      .where("start_time >= ? AND start_time <= ? AND rating != ?", one_month_ago, Time.now, 0)

    ratings_data = filtered_entries
      .group(:rating)
      .count

    average_rating = filtered_entries
      .average(:rating)

    average_rating = average_rating.round(2)
    render json: { ratings_count: ratings_data, average_rating: average_rating }
  end

  def average_rating_custom_range
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

    average_rating = entries.average(:rating)

    if average_rating.nil?
      render json: { average_rating: "No data available." }
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

