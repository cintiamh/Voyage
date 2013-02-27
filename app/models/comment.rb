class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :piece
  belongs_to :category
  belongs_to :connection
  belongs_to :tour

  has_many :likes

  attr_accessible :content
end
