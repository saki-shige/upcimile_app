class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :introduction, limit: 300
      t.date :available_from, null: false
      t.date :available_to
      t.boolean :can_be_provided, default: true
      t.references :company, foreign_key: true

      t.timestamps
    end
  end
end
