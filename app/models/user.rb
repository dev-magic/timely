# An event participant
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true

  has_many :events_users, dependent: :destroy
  has_many :events, through: :events_users
  has_many :preferences, dependent: :destroy
end
