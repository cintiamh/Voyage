class Information < ActiveRecord::Base
  belongs_to :piece
  belongs_to :connection
  belongs_to :tour
  attr_accessible :after, :before, :piece_id, :tour_id

  validates :before, :presence => true
  validates :after, :presence => true
end
