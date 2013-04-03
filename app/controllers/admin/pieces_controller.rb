class Admin::PiecesController < ApplicationController
  layout "admin"

  def index
    @page = "pieces"
  end

  def new
    @page = "pieces"
  end
end
