ActiveAdmin.register City do
  index do
    #column :country
    column :state
    column :name
    default_actions
  end

  filter :name

  form do |f|
    f.inputs "Location" do
      #f.input :country_id
      f.input :state
      f.input :name
    end
    f.actions
  end
end
