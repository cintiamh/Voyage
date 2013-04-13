class TourItem < ActiveRecord::Base
  attr_accessible :fixed, :piece_id, :position, :tour_id
end
