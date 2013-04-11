class Tour < ActiveRecord::Base
  belongs_to :user

  has_many :tour_histories
  has_many :informations
  has_many :comments
  has_many :likes

  has_and_belongs_to_many :pieces
  has_and_belongs_to_many :categories

  attr_accessible :about, :curated, :image, :public, :title, :user_id, :tour_histories, :comments, :likes, :categories, :image_file_name, :image_content_type, :image_file_size, :image_updated_at, :pieces_attributes, :informations_attributes

  has_attached_file :image
end
