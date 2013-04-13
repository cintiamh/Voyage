class Connection < ActiveRecord::Base

  has_many :informations
  has_many :comments
  has_many :likes

  attr_accessible :description, :piece1, :piece2, :title, :piece_id, :informations, :comments, :likes
end
