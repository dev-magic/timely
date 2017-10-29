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

  def timeslots_with_ranking
    timeslots_with_score = add_score_to_timeslot(timeslots)

    sorted_timeslots = timeslots_with_score.sort do |a, b|
      b.score <=> a.score
    end

    add_rank_to_timeslots sorted_timeslots
  end

  def add_score_to_timeslot(timeslots)
    timeslots.map do |timeslot|
      score = timeslot.preferences.reduce(0) do |sum, pref|
        sum + preference_score(pref.preference_type)
      end

      timeslot.define_singleton_method(:score) { score }
      timeslot.define_singleton_method(:rank) { nil }
      timeslot
    end
  end

  def add_rank_to_timeslots(timeslot_array)
    timeslot_array.each_with_index.map do |timeslot, i|
      if i < 3
        ranking = 1 + i
        timeslot.define_singleton_method(:rank) { ranking }
      end
      timeslot
    end
  end

  def preference_score(preference)
    return 1 if preference == 'tentative'
    return 2 if preference == 'available'
    return 3 if preference == 'preferred'
    return -100 if preference == 'not_available'
    0
  end

  def add_best_timeslot
    ranked_timeslots = timeslots_with_ranking
    best_timeslot = ranked_timeslots.select { |ts| ts.rank == 1 }

    define_singleton_method(:best_timeslot) { best_timeslot[0].start_time }

    self
  end
end
