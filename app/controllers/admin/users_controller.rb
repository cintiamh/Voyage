class Admin::UsersController < ApplicationController
  layout "admin"

  def index
    @page = "users"
  end
end
