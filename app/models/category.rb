class Category < ActiveRecord::Base
  belongs_to :category

  has_many :categories

  has_and_belongs_to_many :pieces

  attr_accessible :about, :title
end
