class CreateCategoriesTours < ActiveRecord::Migration
  def self.up
    create_table :categories_tours, :id => false do |t|
      t.integer :category_id
      t.integer :tour_id
    end
  end

  def self.down
    drop_table :categories_tours
  end
end
