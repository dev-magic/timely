class CreateTimeslots < ActiveRecord::Migration[5.1]
  def change
    create_table :timeslots do |t|
      t.references :event, index: true, foreign_key: true, null: false
      t.datetime :start_time, null: false
      t.timestamps
    end
  end
end
