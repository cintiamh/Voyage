
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
    @pieces_on_tour = items.map {|i| Piece.includes(:informations,:questions => :answers).find(i)}
    #@pieces = Piece.all
    js :params => {:pieces_list => @pieces_on_tour, :connection_list => @connections, :tour_id => identity}

  end

  def floors
    @galleries = Gallery.all
    identity = params[:identity]
    tour = Tour.includes(:connections,:tour_items).find(identity)
    @connections =  tour.connections
    items = tour.tour_items
    @pieces_on_tour = items.map {|i| Piece.includes(:informations,:questions => :answers).find(i)}
    @questions = @pieces_on_tour.map {|p| p.questions[0]}
    @answers = @questions.map{ |q| Answer.where(:question_id => q.id)}
    js :params => {:galleries_list => @galleries, :pieces_list => @pieces_on_tour, :question_list => @questions, :answer_list => @answers}

  end

end
