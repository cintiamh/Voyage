class CreatePiecesTours < ActiveRecord::Migration
  def self.up
    create_table :pieces_tours, :id => false do |t|
      t.integer :piece_id
      t.integer :tour_id
    end
  end

  def self.down
    drop_table :pieces_tours
  end
end
