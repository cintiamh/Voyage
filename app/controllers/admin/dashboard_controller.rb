class Admin::DashboardController < ApplicationController

  layout "admin"


  def index
    @page = "dashboard#index"
  end
end
