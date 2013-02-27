class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :piece
  belongs_to :category
  belongs_to :connection
  belongs_to :tour
  belongs_to :comment
  attr_accessible :like
end
