# A location where events are held (coffee shop, library, etc)
class Location < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true

  has_many :events
end
