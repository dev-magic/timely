class AddJoinTableForEventsAndUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :events_users do |t|
      t.references :event, foreign_key: true, index: true, null: false
      t.references :user, foreign_key: true, index: true, null: false
    end

    add_index :events_users, [:event_id, :user_id], unique: true
  end
end
