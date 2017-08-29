# A potential time for an event
class Timeslot < ApplicationRecord
  validates :start_time, presence: true

  belongs_to :event
  has_many :preferences, through: :event, class_name: 'Event'
end
