# An event participant
class User < ApplicationRecord
  validates_presence_of :name, :email

  has_many :events_users, dependent: :destroy
  has_many :events, through: :events_users
end
