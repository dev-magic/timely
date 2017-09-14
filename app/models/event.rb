# Event for users to attend
class Event < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: true
  validates :duration_minutes, presence: true

  belongs_to :location
  has_many :events_users, dependent: :destroy
  has_many :users, through: :events_users
  has_many :timeslots, dependent: :destroy

  after_create do |event|
    User.find_each do |user|
      EventsUser.create(
        event_id: event.id,
        user_id: user.id
      )
    end
  end
end
