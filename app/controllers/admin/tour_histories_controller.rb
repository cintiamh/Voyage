class Admin::TourHistoriesController < Admin::ResourceController
  # GET /tour_histories
  # GET /tour_histories.json
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @tour_histories = TourHistory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tour_histories }
    end
  end

  # GET /tour_histories/1
  # GET /tour_histories/1.json
  def show
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @tour_history = TourHistory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tour_history }
    end
  end

  # GET /tour_histories/new
  # GET /tour_histories/new.json
  def new
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @tour_history = TourHistory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tour_history }
    end
  end

  # GET /tour_histories/1/edit
  def edit
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @tour_history = TourHistory.find(params[:id])
  end

  # POST /tour_histories
  # POST /tour_histories.json
  def create
    @tour_history = TourHistory.new(params[:tour_history])

    respond_to do |format|
      if @tour_history.save
        format.html { redirect_to [:admin, @tour_history], notice: 'Tour history was successfully created.' }
        format.json { render json: @tour_history, status: :created, location: @tour_history }
      else
        format.html { render action: "new" }
        format.json { render json: @tour_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tour_histories/1
  # PUT /tour_histories/1.json
  def update
    @tour_history = TourHistory.find(params[:id])

    respond_to do |format|
      if @tour_history.update_attributes(params[:tour_history])
        format.html { redirect_to [:admin, @tour_history], notice: 'Tour history was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @tour_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tour_histories/1
  # DELETE /tour_histories/1.json
  def destroy
    @tour_history = TourHistory.find(params[:id])
    @tour_history.destroy

    respond_to do |format|
      format.html { redirect_to admin_tour_histories_url }
      format.json { head :no_content }
    end
  end
end
