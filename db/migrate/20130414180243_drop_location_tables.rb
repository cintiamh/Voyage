class DropLocationTables < ActiveRecord::Migration
  def change
    drop_table :countries
    drop_table :states
    drop_table :cities
  end
end
