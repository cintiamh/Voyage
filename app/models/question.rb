class Question < ActiveRecord::Base
  belongs_to :piece
  has_many :answers, :dependent => :destroy

  attr_accessible :content, :piece_id, :answers_attributes

  validates :content, :presence => true

  accepts_nested_attributes_for :answers, :allow_destroy => true
end
