class CreatePreferences < ActiveRecord::Migration[5.1]
  def change
    create_table :preferences do |t|
      t.references :timeslot, index: true, null: false
      t.references :user, index: true, null: false
      t.integer :preference_type, null: false, default: 0
      t.timestamps
    end

    add_foreign_key :preferences, :timeslot
    add_foreign_key :preferences, :user
  end
end
