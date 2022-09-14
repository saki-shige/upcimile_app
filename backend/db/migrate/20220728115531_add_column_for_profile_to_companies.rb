class AddColumnForProfileToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :introduction, :text
    add_column :companies, :address, :string
    add_column :companies, :number_of_employees, :integer
    add_column :companies, :capital, :integer
    add_column :companies, :date_of_establishment, :date
    add_column :companies, :corporate_site, :string
  end
end
