class CreateConnectionsPieces < ActiveRecord::Migration
  def up
    create_table :connections_pieces, :id => false do |t|
      t.integer :connection_id
      t.integer :piece_id
    end
  end

  def down
  end
end
