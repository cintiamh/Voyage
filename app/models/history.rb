class History < ActiveRecord::Base
  belongs_to :tour
  belongs_to :user

  attr_accessible :chosen_date, :executed_date
end
