class AddAttachmentImageToPieces < ActiveRecord::Migration
  def self.up
    change_table :pieces do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :pieces, :image
  end
end
