class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.boolean :like
      t.references :user
      t.references :piece
      t.references :category
      t.references :connection
      t.references :tour
      t.references :comment

      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, :piece_id
    add_index :likes, :category_id
    add_index :likes, :connection_id
    add_index :likes, :tour_id
    add_index :likes, :comment_id
  end
end
