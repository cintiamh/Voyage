class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.string :title
      t.text :description
      t.integer :piece1
      t.integer :piece2

      t.timestamps
    end
  end
end
