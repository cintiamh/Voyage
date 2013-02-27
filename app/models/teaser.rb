class Teaser < ActiveRecord::Base
  belongs_to :piece
  attr_accessible :answer, :question
end
