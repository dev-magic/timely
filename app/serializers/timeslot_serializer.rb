class TimeslotSerializer < ActiveModel::Serializer
  attributes :id, :start_time
  has_many :preferences
end
