class Entry < ApplicationRecord
  belongs_to :logbook
  enum rating: { no_data: 0, horrible: 1, mediocre: 2, OK: 3, good: 4, perfect: 5}, _default: :no_data
  validates :rating, presence: true
  validates :start_time, presence: true
  validates :duration, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validate :end_time_after_start_time
  private

  def end_time_after_start_time
    if start_time.present? && end_time.present? && start_time >= end_time
      errors.add(:end_time, "must be after start time")
    end
  end

end
