namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    admin = User.create!(email: "andrew.carnegie.etc@gmail.com",
                         password: "42uzVGbe",
                         password_confirmation: "42uzVGbe")
    admin.toggle!(:admin)
  end
end