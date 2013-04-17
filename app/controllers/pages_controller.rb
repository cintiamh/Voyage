
class PagesController < ApplicationController
  def index

  end

  def identities

    @tours = Tour.all
    js :params => {:tours_list => @tours}

  end

  def items

    identity = params[:identity]
    tour = Tour.includes(:connections,:tour_items).find(identity)
    @connections =  tour.connections
    items = tour.tour_items
    @pieces_on_tour = items.map {|i| Piece.find(i)}
    #@pieces = Piece.all
    js :params => {:pieces_list => @pieces_on_tour}

  end

  def floors

    @galleries = Gallery.all
    @pieces = Piece.includes(:questions => :answers).all
    js :params => {:galleries_list => @galleries, :pieces_list => @pieces}

  end

end
