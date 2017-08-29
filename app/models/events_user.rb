# Determines who is going to each event
class EventsUser < ApplicationRecord
  belongs_to :event
  belongs_to :user
end
