class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name, index: true, unique: true, null: false
      t.datetime :time, index: true, null: false
      t.integer :duration, index: true, null: false
      t.timestamps
    end
  end
end
