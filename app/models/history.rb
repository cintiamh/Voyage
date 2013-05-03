class History < ActiveRecord::Base
  belongs_to :tour
  belongs_to :user

  has_and_belongs_to_many :tour_items

  attr_accessible :chosen_date, :executed_date, :tour_id, :user_id

  validates :tour_id, :presence => true
end
