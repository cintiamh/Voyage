class CreateHitoriesTourItemsTable < ActiveRecord::Migration
  def self.up
    create_table :histories_tour_items, :id => false do |t|
      t.references :history
      t.references :tour_item
    end
    add_index :histories_tour_items, [:history_id, :tour_item_id]
    add_index :histories_tour_items, [:tour_item_id, :history_id]
  end

  def self.down
    drop_table :histories_tour_items
  end
end
