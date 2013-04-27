namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    admin = User.create!(email: "madhu@gmail.com",
                         password: "thevoyage",
                         password_confirmation: "thevoyage")
    admin.toggle!(:admin)
  end
end