class AddFieldsToPieces < ActiveRecord::Migration
  def change
    add_column :pieces, :museum, :string
    add_column :pieces, :latin, :string
    add_column :pieces, :description, :text
    add_column :pieces, :period, :string
    add_column :pieces, :collection_number, :string
  end
end
