class Admin::HistoriesController < Admin::ResourceController
  # GET /histories
  # GET /histories.json
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end

    @histories = History.paginate(:per_page => 10, :page => params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @histories }
    end
  end

  # GET /histories/1
  # GET /histories/1.json
  def show
    unless current_user.try(:admin?)
      redirect_to "/"
    end

    @history = History.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/new
  # GET /histories/new.json
  def new
    unless current_user.try(:admin?)
      redirect_to "/"
    end

    @history = History.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/1/edit
  def edit
    unless current_user.try(:admin?)
      redirect_to "/"
    end

    @history = History.find(params[:id])
  end

  # DELETE /histories/1
  # DELETE /histories/1.json
  def destroy
    @history = History.find(params[:id])
    @history.destroy

    respond_to do |format|
      format.html { redirect_to histories_url }
      format.json { head :no_content }
    end
  end
end
