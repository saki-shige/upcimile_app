class ChangeDefaultValueOfIsAccepted < ActiveRecord::Migration[6.1]
  def change
    change_column_default :offers, :is_accepted, from: true, to: nil
    change_column_null :offers, :is_accepted, true
  end
end
