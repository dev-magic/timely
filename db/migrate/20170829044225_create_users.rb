class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name, index: true, unique: true, null: false
      t.string :email, index: true, unique: true, null: false
      t.timestamps
    end
  end
end
