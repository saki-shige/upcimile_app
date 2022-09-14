class AddColumnIntroductionAndImageToCreators < ActiveRecord::Migration[6.1]
  def change
    add_column :creators, :image, :string
    add_column :creators, :introduction, :text
  end
end
