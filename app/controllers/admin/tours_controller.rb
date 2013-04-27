class Admin::ToursController < Admin::ResourceController

  helper_method :sort_column, :sort_direction

  # GET /tours
  # GET /tours.json
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "tours"
    @tours = Tour.order(sort_column + " " + sort_direction)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tours }
    end
  end

  # GET /tours/1
  # GET /tours/1.json
  def show
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "tours"
    @tour = Tour.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tour }
    end
  end

  # GET /tours/new
  # GET /tours/new.json
  def new
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "tours"
    @tour = Tour.new
    @pieces = Piece.find(:all, :order => "title ASC")

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tour }
    end
  end

  # GET /tours/1/edit
  def edit
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "tours"
    @tour = Tour.find(params[:id])
    @pieces = Piece.find(:all, :order => "title ASC")
  end

  # POST /tours
  # POST /tours.json
  def create
    @tour = Tour.new(params[:tour])

    respond_to do |format|
      if @tour.save
        format.html { redirect_to [:admin, @tour], notice: 'Tour was successfully created.' }
        format.json { render json: @tour, status: :created, location: @tour }
      else
        format.html { render action: "new" }
        format.json { render json: @tour.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tours/1
  # PUT /tours/1.json
  def update
    @tour = Tour.find(params[:id])

    respond_to do |format|
      if @tour.update_attributes(params[:tour])
        format.html { redirect_to [:admin, @tour], notice: 'Tour was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @tour.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tours/1
  # DELETE /tours/1.json
  def destroy
    @tour = Tour.find(params[:id])
    @tour.destroy

    respond_to do |format|
      format.html { redirect_to admin_tours_url }
      format.json { head :no_content }
    end
  end

  private

  def sort_column
    Tour.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
