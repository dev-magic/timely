class RenameDurationToDurationMinutes < ActiveRecord::Migration[5.1]
  def change
    rename_column :events, :duration, :duration_minutes
  end
end
