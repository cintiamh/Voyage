class DropTeasers < ActiveRecord::Migration
  def change
    drop_table :teasers
  end
end
