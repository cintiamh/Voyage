class Admin::PiecesController < Admin::ResourceController

  helper_method :sort_column, :sort_direction

  # GET /pieces
  # GET /pieces.json
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "pieces"
    @pieces = Piece.search(params[:search]).order(sort_column + " " + sort_direction).paginate(:per_page => 10, :page => params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pieces }
    end
  end

  # GET /pieces/1
  # GET /pieces/1.json
  def show
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "pieces"
    @piece = Piece.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @piece }
    end
  end

  # GET /pieces/new
  # GET /pieces/new.json
  def new
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "pieces"
    @piece = Piece.new
    @creators = Creator.find(:all)
    @galleries = Gallery.find(:all)

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @piece }
    end
  end

  # GET /pieces/1/edit
  def edit
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "pieces"
    @piece = Piece.find(params[:id])

    @creators = Creator.find(:all)
    @galleries = Gallery.find(:all)
  end

  # POST /pieces
  # POST /pieces.json
  def create
    @piece = Piece.new(params[:piece])

    respond_to do |format|
      if @piece.save
        format.html { redirect_to [:admin, @piece], notice: 'Piece was successfully created.' }
        format.json { render json: @piece, status: :created, location: @piece }
      else
        format.html { render action: "new" }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /pieces/1
  # PUT /pieces/1.json
  def update
    @piece = Piece.find(params[:id])

    respond_to do |format|
      if @piece.update_attributes(params[:piece])
        format.html { redirect_to [:admin, @piece], notice: 'Piece was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pieces/1
  # DELETE /pieces/1.json
  def destroy
    @piece = Piece.find(params[:id])
    @piece.destroy

    respond_to do |format|
      format.html { redirect_to admin_pieces_url }
      format.json { head :no_content }
    end
  end

  private

  def sort_column
    Piece.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
