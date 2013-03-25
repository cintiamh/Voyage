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

ActiveRecord::Schema.define(:version => 20130325195842) do

  create_table "active_admin_comments", :force => true do |t|
    t.string   "resource_id",   :null => false
    t.string   "resource_type", :null => false
    t.integer  "author_id"
    t.string   "author_type"
    t.text     "body"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "namespace"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], :name => "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], :name => "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], :name => "index_admin_notes_on_resource_type_and_resource_id"

  create_table "admin_users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "admin_users", ["email"], :name => "index_admin_users_on_email", :unique => true
  add_index "admin_users", ["reset_password_token"], :name => "index_admin_users_on_reset_password_token", :unique => true

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

  create_table "categories_tours", :id => false, :force => true do |t|
    t.integer "category_id"
    t.integer "tour_id"
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.integer  "state_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "cities", ["state_id"], :name => "index_cities_on_state_id"

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.integer  "piece_id"
    t.integer  "category_id"
    t.integer  "connection_id"
    t.integer  "tour_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "comments", ["category_id"], :name => "index_comments_on_category_id"
  add_index "comments", ["connection_id"], :name => "index_comments_on_connection_id"
  add_index "comments", ["piece_id"], :name => "index_comments_on_piece_id"
  add_index "comments", ["tour_id"], :name => "index_comments_on_tour_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

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

  create_table "information", :force => true do |t|
    t.text     "before"
    t.text     "after"
    t.integer  "piece_id"
    t.integer  "connection_id"
    t.integer  "tour_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "information", ["connection_id"], :name => "index_information_on_connection_id"
  add_index "information", ["piece_id"], :name => "index_information_on_piece_id"
  add_index "information", ["tour_id"], :name => "index_information_on_tour_id"

  create_table "likes", :force => true do |t|
    t.boolean  "like"
    t.integer  "user_id"
    t.integer  "piece_id"
    t.integer  "category_id"
    t.integer  "connection_id"
    t.integer  "tour_id"
    t.integer  "comment_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "likes", ["category_id"], :name => "index_likes_on_category_id"
  add_index "likes", ["comment_id"], :name => "index_likes_on_comment_id"
  add_index "likes", ["connection_id"], :name => "index_likes_on_connection_id"
  add_index "likes", ["piece_id"], :name => "index_likes_on_piece_id"
  add_index "likes", ["tour_id"], :name => "index_likes_on_tour_id"
  add_index "likes", ["user_id"], :name => "index_likes_on_user_id"

  create_table "pieces", :force => true do |t|
    t.string   "title"
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
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "pieces", ["city_id"], :name => "index_pieces_on_city_id"
  add_index "pieces", ["country_id"], :name => "index_pieces_on_country_id"
  add_index "pieces", ["creator_id"], :name => "index_pieces_on_creator_id"
  add_index "pieces", ["gallery_id"], :name => "index_pieces_on_gallery_id"
  add_index "pieces", ["state_id"], :name => "index_pieces_on_state_id"

  create_table "pieces_tours", :id => false, :force => true do |t|
    t.integer "piece_id"
    t.integer "tour_id"
  end

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

  create_table "tour_histories", :force => true do |t|
    t.datetime "chosen_date"
    t.datetime "executed_date"
    t.integer  "tour_id"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "tour_histories", ["tour_id"], :name => "index_tour_histories_on_tour_id"
  add_index "tour_histories", ["user_id"], :name => "index_tour_histories_on_user_id"

  create_table "tours", :force => true do |t|
    t.string   "title"
    t.string   "image"
    t.boolean  "curated"
    t.boolean  "public"
    t.text     "about"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "tours", ["user_id"], :name => "index_tours_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.datetime "modification_date"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
