class Tour < ActiveRecord::Base
  belongs_to :user

  has_many :tour_histories
  has_many :informations
  has_many :comments
  has_many :likes

  has_and_belongs_to_many :pieces
  has_and_belongs_to_many :categories

  attr_accessible :about, :curated, :image, :modification_date, :public, :title
end
