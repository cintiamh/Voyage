ActiveAdmin.register Piece do

  scope :all
  scope :inExhibition
  scope :notExhibited

  index do
    column :title
    column :medium
    column :measurements
    column :exhibited
    column :created_at
    column :updated_at
    default_actions
  end


end
