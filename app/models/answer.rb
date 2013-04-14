class Answer < ActiveRecord::Base
  belongs_to :question

  attr_accessible :content, :question_id, :correct

  validates :content, :presence => true
end
