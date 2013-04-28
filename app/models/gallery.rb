class Gallery < ActiveRecord::Base
  has_many :pieces

  validates :name, :presence => true

  attr_accessible :about, :name, :order, :floor

  def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end
