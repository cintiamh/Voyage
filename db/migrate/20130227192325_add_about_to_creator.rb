class AddAboutToCreator < ActiveRecord::Migration
  def change
    add_column :creators, :about, :text
  end
end
