class RemovePiece2FromConnections < ActiveRecord::Migration
  def up
    remove_column :connections, :piece2
  end

  def down
    add_column :connections, :piece2, :integer
  end
end
