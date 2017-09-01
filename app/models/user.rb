# An event participant
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true

  has_many :events_users, dependent: :destroy
  has_many :events, through: :events_users
end
