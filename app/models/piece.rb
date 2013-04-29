class Piece < ActiveRecord::Base
  belongs_to :creator
  belongs_to :gallery

  #has_many :connections
  has_many :informations, :dependent => :destroy
  has_many :comments
  has_many :likes
  has_many :questions, :dependent => :destroy
  has_many :answers, :through => :questions
  has_many :tour_items, :dependent => :destroy
  has_many :tours, :through => :tour_items

  has_and_belongs_to_many :connections

  scope :inExhibition, where(:exhibited => true)
  scope :notExhibited, where(:exhibited => false)

  attr_accessible :accession_number, :credit, :exhibited, :measurements, :medium, :title, :image, :image_content_type, :image_file_name, :image_file_size, :image_updated_at, :questions_attributes, :informations_attributes, :creator_id, :gallery_id, :location, :connections_attributes, :tour_attributes, :museum, :latin, :period, :collection_number, :description

  validates :title, :presence => true

  #default_scope order('title ASC')

  has_attached_file :image, styles: {
      thumb:  '50x50>',
      medium: '100x100>',
      large:  '120x120>'
  }

  accepts_nested_attributes_for :questions, :allow_destroy => true
  accepts_nested_attributes_for :informations, :allow_destroy => true

  def self.search(search)
    if search
      where('title LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end
