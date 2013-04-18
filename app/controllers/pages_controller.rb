
class PagesController < ApplicationController

  layout :resolve_layout

  def index

  end

  def identities

    @tours = Tour.all
    js :params => {:tours_list => @tours}

  end

  def items

    @pieces = Piece.all
    js :params => {:pieces_list => @pieces}

  end

  def floors

    @galleries = Gallery.all
    @pieces = Piece.all
    js :params => {:galleries_list => @galleries, :pieces_list => @pieces}

  end

  def desktop

  end

  private

  def resolve_layout
    case action_name
      when "desktop"
        "desktop"
      else
        "application"
    end
  end

end
