class AddLocationToPieces < ActiveRecord::Migration
  def change
    add_column :pieces, :location, :string
  end
end
