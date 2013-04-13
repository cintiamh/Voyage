class CreateTourItems < ActiveRecord::Migration
  def change
    create_table :tour_items do |t|
      t.integer :tour_id
      t.integer :piece_id
      t.boolean :fixed
      t.string :position

      t.timestamps
    end
  end
end
