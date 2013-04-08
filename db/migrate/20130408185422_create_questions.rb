class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.references :piece
      t.text :content

      t.timestamps
    end
    add_index :questions, :piece_id
  end
end
