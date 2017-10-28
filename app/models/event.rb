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


  def calculate_timeslot_ranking
    timeslots_with_score = self.timeslots.map do |timeslot|
      score = timeslot.preferences.reduce(0) do |sum, pref|
        case pref.preference_type
        when 'tentative'
          sum += 1
        when 'available'
          sum += 2
        when 'preferred'
          sum += 3
        when 'not_available'
          sum -= 100
        else
          # do nothing
        end
        sum
      end

      timeslot.define_singleton_method(:score) { score }
      timeslot
    end

    timeslots_with_score.sort do |a, b|
      b.score <=> a.score
    end.each_with_index.map do |timeslot, i|
      if i < 3
        ranking = 1 + i
        timeslot.define_singleton_method(:rank) { ranking }
      else
        timeslot.define_singleton_method(:rank) { nil }
      end
      timeslot
    end
  end
end
