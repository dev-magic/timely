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

  def best_timeslot
    ranked_timeslots = timeslots_with_ranking

    return nil if timeslots_with_ranking.all? { |ts| ts.score == 0 }

    best_timeslot = ranked_timeslots.select { |ts| ts.rank == 1 }
    best_timeslot[0].start_time
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
      timeslot
    end
  end

  def add_rank_to_timeslots(timeslot_array)
    return timeslot_array if timeslot_array.all? { |ts| ts.score == 0 }

    timeslot_array.each_with_index.map do |timeslot, i|
      if i < 3
        ranking = 1 + i
        timeslot.define_singleton_method(:rank) { ranking }
      end
      timeslot
    end
  end

  def preference_score(preference)
    case preference
    when 'tentative' then 1
    when 'available' then 2
    when 'preferred' then 3
    when 'not_available' then -100
    else 0
    end
  end
end
