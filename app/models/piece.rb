class Piece < ActiveRecord::Base
  belongs_to :creator
  belongs_to :country
  belongs_to :state
  belongs_to :city
  belongs_to :gallery

  has_many :teasers
  has_many :connections

  has_and_belongs_to_many :categories

  attr_accessible :accession_number, :credit, :exhibited, :measurements, :medium, :modification_date, :title
end
