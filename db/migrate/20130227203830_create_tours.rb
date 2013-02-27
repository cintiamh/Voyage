class CreateTours < ActiveRecord::Migration
  def change
    create_table :tours do |t|
      t.string :title
      t.datetime :modification_date
      t.string :image
      t.boolean :curated
      t.boolean :public
      t.text :about
      t.references :user

      t.timestamps
    end
    add_index :tours, :user_id
  end
end
