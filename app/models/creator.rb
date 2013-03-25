class Creator < ActiveRecord::Base

  validates :name, :presence => true

  attr_accessible :name, :about
end
