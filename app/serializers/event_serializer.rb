class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :slug, :best_timeslot

  def location
    object.location.name
  end
end
