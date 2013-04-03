class Admin::ToursController < ApplicationController
  layout "admin"

  def index
    @page = "tours"
  end
end
