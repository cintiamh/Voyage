class RemoveModificationDateColumn < ActiveRecord::Migration
  def up
    remove_column :pieces, :modification_date
    remove_column :tours, :modification_date
  end

  def down
    add_column :pieces, :modification_date, :datetime
    add_column :tours, :modification_date, :datetime
  end
end
