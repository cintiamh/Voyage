class User < ActiveRecord::Base

  has_many :tours
  has_many :tour_histories
  has_many :comments
  has_many :likes

  attr_accessible :email, :first_name, :last_name, :modification_date, :username
end
