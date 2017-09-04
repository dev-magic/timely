class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location

  def location
    object.location.name
  end
end
