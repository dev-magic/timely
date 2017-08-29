class User < ApplicationRecord
  has_many :events_users, dependent: :destroy
  has_many :events, through: :events_users
end
