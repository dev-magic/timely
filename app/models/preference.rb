class Preference < ApplicationRecord
  belongs_to :timeslot
  belongs_to :user

  enum preference_type: [:none,
                         :not_available,
                         :tentative,
                         :available,
                         :preferred]
end
