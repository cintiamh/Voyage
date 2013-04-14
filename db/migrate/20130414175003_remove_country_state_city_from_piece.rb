class RemoveCountryStateCityFromPiece < ActiveRecord::Migration
  def up
    remove_column :pieces, :country_id
    remove_column :pieces, :state_id
    remove_column :pieces, :city_id
  end

  def down
    add_column :pieces, :country_id, :integer
    add_column :pieces, :state_id, :integer
    add_column :pieces, :city_id, :integer
  end
end
