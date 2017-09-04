class EventShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :duration_minutes

  def location
    object.location.name
  end
end
