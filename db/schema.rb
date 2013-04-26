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

ActiveRecord::Schema.define(:version => 20130424174706) do

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

  create_table "answers", :force => true do |t|
    t.integer  "question_id"
    t.string   "content"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.boolean  "correct"
  end

  add_index "answers", ["question_id"], :name => "index_answers_on_question_id"

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.integer  "piece_id"
    t.integer  "category_id"
    t.integer  "connection_id"
    t.integer  "tour_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.boolean  "approved"
  end

  add_index "comments", ["category_id"], :name => "index_comments_on_category_id"
  add_index "comments", ["connection_id"], :name => "index_comments_on_connection_id"
  add_index "comments", ["piece_id"], :name => "index_comments_on_piece_id"
  add_index "comments", ["tour_id"], :name => "index_comments_on_tour_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "connections", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "tour_id"
  end

  create_table "connections_pieces", :id => false, :force => true do |t|
    t.integer "connection_id"
    t.integer "piece_id"
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
    t.integer  "floor"
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
    t.integer  "gallery_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "image"
    t.string   "location"
    t.string   "museum"
    t.string   "latin"
    t.text     "description"
    t.string   "period"
    t.string   "collection_number"
  end

  add_index "pieces", ["creator_id"], :name => "index_pieces_on_creator_id"
  add_index "pieces", ["gallery_id"], :name => "index_pieces_on_gallery_id"

  create_table "pieces_tours", :id => false, :force => true do |t|
    t.integer "piece_id"
    t.integer "tour_id"
  end

  create_table "questions", :force => true do |t|
    t.integer  "piece_id"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "questions", ["piece_id"], :name => "index_questions_on_piece_id"

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

  create_table "tour_items", :force => true do |t|
    t.integer  "tour_id"
    t.integer  "piece_id"
    t.boolean  "fixed"
    t.string   "position"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tours", :force => true do |t|
    t.string   "title"
    t.string   "image"
    t.boolean  "curated"
    t.boolean  "public"
    t.text     "about"
    t.integer  "user_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "tours", ["user_id"], :name => "index_tours_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.datetime "modification_date"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.string   "email",                  :default => "",    :null => false
    t.string   "encrypted_password",     :default => "",    :null => false
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
    t.boolean  "admin",                  :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
