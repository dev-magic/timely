# A location where events are held (coffee shop, library, etc)
class Location < ApplicationRecord
  has_many :events
end
