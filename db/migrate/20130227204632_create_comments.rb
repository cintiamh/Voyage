class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.references :user
      t.references :piece
      t.references :category
      t.references :connection
      t.references :tour

      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :piece_id
    add_index :comments, :category_id
    add_index :comments, :connection_id
    add_index :comments, :tour_id
  end
end
