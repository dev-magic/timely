class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :slug

  def location
    object.location.name
  end
end
