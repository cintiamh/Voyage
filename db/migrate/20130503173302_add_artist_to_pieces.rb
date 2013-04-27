class AddArtistToPieces < ActiveRecord::Migration
  def change
    add_column :pieces, :artist, :string
  end
end
