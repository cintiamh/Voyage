class MobileController < ApplicationController
  def index
    @page = "mobile"
  end

  def museums
    @page = "museums"
  end

  def finish
    @comment = Comment.new
  end

  def create_comment
    @comment = Comment.new(params[:comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to "/", notice: 'Comment was successfully created.' }
        format.json { render json: @comment, status: :created, location: @comment }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
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
    @pieces_on_tour = items.map {|i| Piece.includes(:informations,:questions => :answers).find(i.piece_id)}
    @information = @pieces_on_tour.map {|p| Information.where(:piece_id => p.id)}

    #@pieces = Piece.all
    js :params => {:pieces_list => @pieces_on_tour, :before_info => @information, :connection_list => @connections, :tour_id => identity}


  end

  def floors

    @galleries = Gallery.all
    @ident = params[:identity]
    tour = Tour.includes(:connections,:tour_items).find(@ident)
    @connections =  tour.connections
    items = tour.tour_items
    @pieces_on_tour = items.map {|i| Piece.includes(:informations,:questions => :answers).find(i.piece_id)}
    @questions = @pieces_on_tour.map {|p| p.questions[0]}
    @answers = @questions.map{ |q| Answer.where(:question_id => q.id) if !q.nil?}
    @connections = tour.connections
    @after_info = @pieces_on_tour.map {|p| Information.where(:piece_id => p.id)}

    # TODO @comments
    js :params => {:iden => @ident, :galleries_list => @galleries, :pieces_list => @pieces_on_tour,
                   :question_list => @questions, :answer_list => @answers,
                   :connection_list => @connections, :after_info => @after_info}

  end

end
