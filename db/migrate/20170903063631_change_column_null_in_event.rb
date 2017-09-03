class ChangeColumnNullInEvent < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:events, :time, true, Time.zone.now)
  end
end
