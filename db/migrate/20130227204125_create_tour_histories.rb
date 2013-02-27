class CreateTourHistories < ActiveRecord::Migration
  def change
    create_table :tour_histories do |t|
      t.datetime :chosen_date
      t.datetime :executed_date
      t.references :tour
      t.references :user

      t.timestamps
    end
    add_index :tour_histories, :tour_id
    add_index :tour_histories, :user_id
  end
end
