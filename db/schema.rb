# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130227195222) do

  create_table "categories", :force => true do |t|
    t.string   "title"
    t.text     "about"
    t.integer  "category_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "categories", ["category_id"], :name => "index_categories_on_category_id"

  create_table "categories_products", :id => false, :force => true do |t|
    t.integer "category_id"
    t.integer "product_id"
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.integer  "state_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "cities", ["state_id"], :name => "index_cities_on_state_id"

  create_table "connections", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "piece1"
    t.integer  "piece2"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "countries", :force => true do |t|
    t.string   "name"
    t.string   "language"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "creators", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.text     "about"
  end

  create_table "galleries", :force => true do |t|
    t.string   "name"
    t.integer  "order"
    t.text     "about"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "pieces", :force => true do |t|
    t.string   "title"
    t.datetime "modification_date"
    t.string   "medium"
    t.string   "measurements"
    t.string   "credit"
    t.string   "accession_number"
    t.boolean  "exhibited"
    t.integer  "creator_id"
    t.integer  "country_id"
    t.integer  "state_id"
    t.integer  "city_id"
    t.integer  "gallery_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "pieces", ["city_id"], :name => "index_pieces_on_city_id"
  add_index "pieces", ["country_id"], :name => "index_pieces_on_country_id"
  add_index "pieces", ["creator_id"], :name => "index_pieces_on_creator_id"
  add_index "pieces", ["gallery_id"], :name => "index_pieces_on_gallery_id"
  add_index "pieces", ["state_id"], :name => "index_pieces_on_state_id"

  create_table "states", :force => true do |t|
    t.string   "name"
    t.integer  "country_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "states", ["country_id"], :name => "index_states_on_country_id"

  create_table "teasers", :force => true do |t|
    t.text     "question"
    t.text     "answer"
    t.integer  "piece_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "teasers", ["piece_id"], :name => "index_teasers_on_piece_id"

end
