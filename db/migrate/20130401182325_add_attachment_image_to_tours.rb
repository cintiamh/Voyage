class AddAttachmentImageToTours < ActiveRecord::Migration
  def self.up
    change_table :tours do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :tours, :image
  end
end
