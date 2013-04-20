class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :piece
  belongs_to :connection
  belongs_to :tour
  belongs_to :comment

  attr_accessible :like, :user_id, :piece_id, :connection_id, :tour_id, :comment_id
end
