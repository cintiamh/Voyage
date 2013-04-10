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
  has_many :questions

  #has_and_belongs_to_many :categories
  has_and_belongs_to_many :tours

  scope :inExhibition, where(:exhibited => true)
  scope :notExhibited, where(:exhibited => false)

  attr_accessible :accession_number, :credit, :exhibited, :measurements, :medium, :title, :creator_id, :country_id, :state_id, :city_id, :gallery_id, :image, :image_content_type, :image_file_name, :image_file_size, :image_updated_at, :questions_attributes, :informations_attributes

  validates :title, :presence => true

  has_attached_file :image

  accepts_nested_attributes_for :questions, :allow_destroy => true
  accepts_nested_attributes_for :informations, :allow_destroy => true
end
