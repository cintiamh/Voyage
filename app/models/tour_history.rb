class TourHistory < ActiveRecord::Base
  belongs_to :tour
  belongs_to :user

  attr_accessible :chosen_date, :executed_date, :tour_id, :user_id

  scope :recent, :limit => 10, :order => 'created_at DESC'
end
