class Logbook < ApplicationRecord
  belongs_to :user
  has_many :logentries
end
