class AddJoinTableForEventsAndUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :events_users do |t|
      t.references :event, index: true, null: false
      t.references :user, index: true, null: false
    end

    add_foreign_key :events_users, :event
    add_foreign_key :events_users, :user
    add_index :events_users, [:event_id, :user_id], unique: true
  end
end
