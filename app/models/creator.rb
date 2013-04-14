class Creator < ActiveRecord::Base

  has_many :pieces

  validates :name, :presence => true

  attr_accessible :name, :about
end
