class Category < ActiveRecord::Base
  belongs_to :category

  has_many :categories
  has_many :comments
  has_many :likes

  has_and_belongs_to_many :pieces
  has_and_belongs_to_many :tours

  validates :title, :presence => true

  attr_accessible :about, :title, :categories, :comments, :likes, :pieces, :tours, :category_id
end
