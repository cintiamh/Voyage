class TourItem < ActiveRecord::Base
  belongs_to :piece
  belongs_to :tour

  has_and_belongs_to_many :histories

  attr_accessible :fixed, :piece_id, :position, :tour_id
end
