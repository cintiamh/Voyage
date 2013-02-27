class Information < ActiveRecord::Base
  belongs_to :piece
  belongs_to :connection
  belongs_to :tour
  attr_accessible :after, :before
end
