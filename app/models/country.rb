class Country < ActiveRecord::Base
  has_many :states
  has_many :pieces

  attr_accessible :language, :name
end
