# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

[{:about=>'This is gallery 1', :name=>'Gallery 1', :order=>1, :floor=>1},
 {:about=>'This is gallery 2', :name=>'Gallery 2', :order=>2, :floor=>1},
 {:about=>'This is gallery 3', :name=>'Gallery 3', :order=>3, :floor=>1},
 {:about=>'This is gallery 4', :name=>'Gallery 4', :order=>4, :floor=>1},
 {:about=>'This is gallery 5', :name=>'Gallery 5', :order=>5, :floor=>1}].each do |gallery|
    Gallery.find_or_create_by_about(gallery)
end


