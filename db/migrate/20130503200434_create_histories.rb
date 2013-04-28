class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.datetime :chosen_date
      t.datetime :executed_date
      t.references :tour
      t.references :user

      t.timestamps
    end
    add_index :histories, :tour_id
    add_index :histories, :user_id
  end
end
