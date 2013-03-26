class Piece < ActiveRecord::Base
  belongs_to :creator
  belongs_to :country
  belongs_to :state
  belongs_to :city
  belongs_to :gallery

  has_many :teasers
  has_many :connections
  has_many :informations
  has_many :comments
  has_many :likes

  has_and_belongs_to_many :categories
  has_and_belongs_to_many :tours

  scope :inExhibition, where(:exhibited => true)
  scope :notExhibited, where(:exhibited => false)

  attr_accessible :accession_number, :credit, :exhibited, :measurements, :medium, :title, :creator_id, :country_id, :state_id, :city_id, :gallery_id
end
