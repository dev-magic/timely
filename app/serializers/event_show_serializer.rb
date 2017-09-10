class EventShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :duration_minutes, :slug

  def location
    object.location.name
  end
end
