class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :piece
  belongs_to :category
  belongs_to :connection
  belongs_to :tour

  has_many :likes

  attr_accessible :content, :user_id, :piece_id, :category_id, :connection_id, :tour_id, :like_id

  scope :recent, :limit => 10, :order => 'created_at DESC'
end
