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

  attr_accessible :accession_number, :credit, :exhibited, :measurements, :medium, :modification_date, :title
end
