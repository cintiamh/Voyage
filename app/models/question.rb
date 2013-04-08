class Question < ActiveRecord::Base
  belongs_to :piece

  attr_accessible :content, :piece_id
end
