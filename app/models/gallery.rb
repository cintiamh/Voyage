class Gallery < ActiveRecord::Base
  has_many :pieces

  validates :name, :presence => true

  attr_accessible :about, :name, :order
end
