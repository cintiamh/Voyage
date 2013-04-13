class AddFloorToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :floor, :integer
  end
end
