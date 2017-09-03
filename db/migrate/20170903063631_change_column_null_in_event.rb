class ChangeColumnNullInEvent < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:events, :time, true, nil)
  end
end
