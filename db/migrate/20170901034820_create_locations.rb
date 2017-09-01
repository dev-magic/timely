class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.timestamps
    end
    add_index :locations, :name, unique: true
    add_index :locations, :address, unique: true

    add_reference :events, :location, foreign_key: true, index: true
  end
end
