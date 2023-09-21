class Entry < ApplicationRecord
  belongs_to :logbook
  enum rating: { no_data: 0, horrible: 1, mediocre: 2, OK: 3, good: 4, perfect: 5}, _default: :no_data
end
