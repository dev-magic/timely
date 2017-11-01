# A potential time for an event
class Timeslot < ApplicationRecord
  validates :start_time, presence: true, uniqueness: { scope: :event_id }

  belongs_to :event
  has_many :preferences, dependent: :destroy

  after_create do |timeslot|
    @event = timeslot.event

    @event.users.each do |user|
      Preference.create!(
        timeslot_id: timeslot.id,
        user_id: user.id,
        preference_type: 0
      )
    end
  end

  def rank
  end
end
