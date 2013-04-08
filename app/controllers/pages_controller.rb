
class PagesController < ApplicationController
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

end
