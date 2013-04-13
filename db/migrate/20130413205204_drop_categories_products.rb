class DropCategoriesProducts < ActiveRecord::Migration
  def change
    drop_table :categories_products
  end
end
