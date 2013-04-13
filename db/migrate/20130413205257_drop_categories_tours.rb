class DropCategoriesTours < ActiveRecord::Migration
  def change
    drop_table :categories_tours
  end
end
