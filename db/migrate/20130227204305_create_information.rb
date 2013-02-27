class CreateInformation < ActiveRecord::Migration
  def change
    create_table :information do |t|
      t.text :before
      t.text :after
      t.references :piece
      t.references :connection
      t.references :tour

      t.timestamps
    end
    add_index :information, :piece_id
    add_index :information, :connection_id
    add_index :information, :tour_id
  end
end
