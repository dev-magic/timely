class PreferenceSerializer < ActiveModel::Serializer
  attributes :id, :preference_type, :user_id
  belongs_to :user
  belongs_to :timeslot

  def user_id
    object.user.id
  end
end
