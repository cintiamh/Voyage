class Connection < ActiveRecord::Base

  belongs_to :piece1, :class_name => "Piece"
  belongs_to :piece2, :class_name => "Piece"

  has_many :informations
  has_many :comments
  has_many :likes

  attr_accessible :description, :piece1, :piece2, :title, :piece_id, :informations, :comments, :likes
end
