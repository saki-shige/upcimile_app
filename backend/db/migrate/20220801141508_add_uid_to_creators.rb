class AddUidToCreators < ActiveRecord::Migration[6.1]
  def change
    add_column :creators, :uid, :string
  end
end
