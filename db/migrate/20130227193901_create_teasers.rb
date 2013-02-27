class CreateTeasers < ActiveRecord::Migration
  def change
    create_table :teasers do |t|
      t.text :question
      t.text :answer
      t.references :piece

      t.timestamps
    end
    add_index :teasers, :piece_id
  end
end
