class EventWithBestTimeslotSerializer < EventSerializer
  attributes :best_timeslot

  def best_timeslot
    object.best_timeslot
  end
end
