class CreateOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :offers do |t|
      t.boolean :is_accepted, null: false, default: true
      t.references :product, foreign_key: true
      t.references :creator, foreign_key: true

      t.timestamps
    end
  end
end
