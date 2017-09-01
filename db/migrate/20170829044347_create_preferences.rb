class CreatePreferences < ActiveRecord::Migration[5.1]
  def change
    create_table :preferences do |t|
      t.references :timeslot, foreign_key: true, index: true, null: false
      t.references :user, froeign_key: true, index: true, null: false
      t.integer :preference_type, null: false, default: 0
      t.timestamps
    end
  end
end
