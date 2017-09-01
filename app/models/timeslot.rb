# A potential time for an event
class Timeslot < ApplicationRecord
  validates_presence_of :event_id, :start_time

  belongs_to :event
  has_many :preferences, through: :event, class_name: "Event"
end
