class AddTourToConnections < ActiveRecord::Migration
  def change
    add_column :connections, :tour_id, :integer
  end
end
