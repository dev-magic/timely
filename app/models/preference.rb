class Preference < ApplicationRecord
  belongs_to :timeslot
  belongs_to :user

  enum preference_type: [:not_filled_in,
                         :not_available,
                         :tentative,
                         :available,
                         :preferred]
end
