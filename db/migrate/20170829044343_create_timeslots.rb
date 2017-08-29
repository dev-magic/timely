class CreateTimeslots < ActiveRecord::Migration[5.1]
  def change
    create_table :timeslots do |t|
      t.references :event, index: true, null: false
      t.datetime :start_time, null: false
      t.timestamps
    end
    add_foreign_key :timeslots, :event
  end
end
