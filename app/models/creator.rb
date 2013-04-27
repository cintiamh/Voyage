class Creator < ActiveRecord::Base

  has_many :pieces

  validates :name, :presence => true

  attr_accessible :name, :about

  def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end
