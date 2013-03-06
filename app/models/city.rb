class City < ActiveRecord::Base
  belongs_to :state
  has_many :pieces

  attr_accessible :name, :state_id
end
