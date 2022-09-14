class CreateCreators < ActiveRecord::Migration[6.1]
  def change
    create_table :creators do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :channel_id

      t.timestamps
    end
  end
end
