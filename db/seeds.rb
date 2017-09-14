# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

NUM_USERS = 15
NUM_LOCATIONS = 10
NUM_EVENTS = 15
TIMESLOTS_PER_EVENT = 10
USERS_PER_EVENT = 5

NUM_USERS.times do
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.unique.email,
    password: Faker::Internet.password
  )
end

NUM_LOCATIONS.times do
  Location.create!(
    name: Faker::Address.unique.community,
    address: Faker::Address.unique.street_address
  )
end

LOCATIONS = Location.all

NUM_EVENTS.times do
  event = Event.create!(
    name: Faker::Pokemon.unique.name,
    duration_minutes: rand(300),
    location_id: LOCATIONS.sample.id
  )
end

USERS = User.all

Event.find_each do |event|
  event.users = USERS.sample(USERS_PER_EVENT)
  TIMESLOTS_PER_EVENT.times do
    timeslot = Timeslot.create!(
      event_id: event.id,
      start_time: Faker::Time.forward(30)
    )
    timeslot.preferences.each do |preference|
      preference.preference_type = rand(5)
      preference.save
    end
  end
end
