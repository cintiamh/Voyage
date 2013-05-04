class Tour < ActiveRecord::Base
  belongs_to :user

  #has_many :tour_histories, :dependent => :destroy
  has_many :histories
  has_many :informations
  has_many :comments
  has_many :likes
  has_many :tour_items, :dependent => :destroy, :order => "position ASC"
  has_many :pieces, :through => :tour_items
  has_many :connections

  #has_and_belongs_to_many :pieces
  #has_and_belongs_to_many :categories

  attr_accessible :about, :curated, :image, :public, :title, :user_id, :image_file_name, :image_content_type, :image_file_size, :image_updated_at, :pieces_attributes, :informations_attributes, :tour_items_attributes, :connections_attributes

  validates :title, :presence => true

  has_attached_file :image, styles: {
      thumb:  '50x50>',
      medium: '100x100>',
      large:  '120x120>'
  }

  accepts_nested_attributes_for :pieces
  accepts_nested_attributes_for :tour_items, :allow_destroy => true
  accepts_nested_attributes_for :informations, :allow_destroy => true
  accepts_nested_attributes_for :connections, :allow_destroy => true

  def self.search(search)
    if search
      where('title LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end
