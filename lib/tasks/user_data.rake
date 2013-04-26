namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    admin = User.create!(email: "cintia@pandajapa.com",
                         password: "cintia2402",
                         password_confirmation: "cintia2402")
    admin.toggle!(:admin)
  end
end