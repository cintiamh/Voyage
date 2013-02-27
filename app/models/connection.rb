class Connection < ActiveRecord::Base

  belongs_to :piece1, :class_name => "Piece"
  belongs_to :piece2, :class_name => "Piece"

  attr_accessible :description, :piece1, :piece2, :title
end
