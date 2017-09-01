# Event for users to attend
class Event < ApplicationRecord
  belongs_to :location

  has_many :events_users, dependent: :destroy
  has_many :users, through: :events_users
  has_many :timeslots, dependent: :destroy
end
