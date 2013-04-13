class RemovePiece1FromConnections < ActiveRecord::Migration
  def up
    remove_column :connections, :piece1
  end

  def down
    add_column :connections, :piece1, :integer
  end
end
