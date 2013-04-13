class TourItem < ActiveRecord::Base
  belongs_to :piece
  belongs_to :tour

  attr_accessible :fixed, :piece_id, :position, :tour_id
end
