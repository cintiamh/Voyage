class Country < ActiveRecord::Base
  has_many :states
  has_many :pieces

  attr_accessible :language, :name, :states_attributes

  accepts_nested_attributes_for :states, allow_destroy: true
end
