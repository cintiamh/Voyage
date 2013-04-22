class DesktopController < ApplicationController

  layout "desktop"

  def index
    @page = "home"
  end

  def comments
    @page = "comments"
  end

  def my_tours
    @page = "my_inventory"
  end

  def my_comments
    @page = "my_inventory"
  end

  def find_tour
  end
end
