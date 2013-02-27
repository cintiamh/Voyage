class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.string :title
      t.datetime :modification_date
      t.string :medium
      t.string :measurements
      t.string :credit
      t.string :accession_number
      t.boolean :exhibited
      t.references :creator
      t.references :country
      t.references :state
      t.references :city
      t.references :gallery

      t.timestamps
    end
    add_index :pieces, :creator_id
    add_index :pieces, :country_id
    add_index :pieces, :state_id
    add_index :pieces, :city_id
    add_index :pieces, :gallery_id
  end
end
