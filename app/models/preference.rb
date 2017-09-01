# Expresses someone's availability for a specific day/time
class Preference < ApplicationRecord
  validates_presence_of :preference_type

  belongs_to :timeslot
  belongs_to :user

  enum preference_type: [:not_filled_in,
                         :not_available,
                         :tentative,
                         :available,
                         :preferred]
end
