# A potential time for an event
class Timeslot < ApplicationRecord
  validates_presence_of :start_time, :event_id

  belongs_to :event
  has_many :preferences, class_name: "Event"
end
