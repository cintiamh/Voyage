class Connection < ActiveRecord::Base

  has_many :informations
  has_many :comments
  has_many :likes

  has_and_belongs_to_many :pieces

  attr_accessible :description, :title, :pieces_attributes
end
