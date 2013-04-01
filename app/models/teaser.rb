class Teaser < ActiveRecord::Base
  belongs_to :piece

  validates :piece_id, :presence => true
  validates :question, :presence => true
  validates :answer, :presence => true

  attr_accessible :answer, :question, :piece_id
end
