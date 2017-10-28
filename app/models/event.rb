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

  def add_best_timeslot
    ranked_timeslots = calculate_timeslot_ranking
    best_timeslot = ranked_timeslots.select { |ts| ts.rank == 1 }

    define_singleton_method(:best_timeslot) { best_timeslot[0].start_time }

    self
  end

  def preference_score(preference)
    case preference
    when 'tentative'
      1
    when 'available'
      2
    when 'preferred'
      3
    when 'not_available'
      -100
    else
      0
    end
  end

  def calculate_timeslot_ranking
    timeslots_with_score = timeslots.map do |timeslot|
      score = timeslot.preferences.reduce(0) do |sum, pref|
        sum += preference_score pref.preference_type
        sum
      end

      timeslot.define_singleton_method(:score) { score }
      timeslot.define_singleton_method(:rank) { nil }
      timeslot
    end

    sorted_timeslots = timeslots_with_score.sort do |a, b|
      b.score <=> a.score
    end

    sorted_timeslots.each_with_index.map do |timeslot, i|
      if i < 3
        ranking = 1 + i
        timeslot.define_singleton_method(:rank) { ranking }
      end
      timeslot
    end
  end
end
