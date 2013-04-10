class State < ActiveRecord::Base
  belongs_to :country
  has_many :cities
  has_many :pieces

  attr_accessible :name, :country_id, :cities_attributes

  accepts_nested_attributes_for :cities, allow_destroy: true
end
