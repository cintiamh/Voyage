class State < ActiveRecord::Base
  belongs_to :country
  has_many :cities
  has_many :pieces

  attr_accessible :name
end
