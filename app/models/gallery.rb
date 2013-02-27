class Gallery < ActiveRecord::Base
  has_many :pieces

  attr_accessible :about, :name, :order
end
