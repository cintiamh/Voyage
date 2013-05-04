class HistoriesController < InheritedResources::Base
  # GET /histories
  # GET /histories.json
  def index
    @histories = History.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @histories }
    end
  end

  # GET /histories/1
  # GET /histories/1.json
  def show
    @history = History.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/new
  # GET /histories/new.json
  def new
    @history = History.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/1/edit
  def edit
    @history = History.find(params[:id])
  end

  # POST /histories
  # POST /histories.json
  def create
    @history = History.new(params[:history])
    @history.chosen_date = Time.now
    @tour = Tour.find(@history.tour.id)

    if @tour.tour_items.length > 0
      temp_arr = []
      @tour.tour_items.each do |item|
        if item.fixed
          @history.tour_items << TourItem.find(item.id)
        else
          inserted = false
          temp_arr.each do |temp|
            if temp.first["position"] == item.position
              temp.push({"position" => item.position, "id" => item.id})
              inserted = true
            end
          end
          unless inserted
            temp_arr.push([{"position" => item.position, "id" => item.id}])
          end
        end
      end
      temp_arr.each do |temp|
        if temp.length > 1
          @history.tour_items << TourItem.find(temp[SecureRandom.random_number(temp.length)]["id"])
        else
          @history.tour_items << TourItem.find(temp[0]["id"])
        end
      end
    end

    respond_to do |format|
      if @history.save
        session[:history_id] = @history.id
        format.html { redirect_to @history.tour, notice: 'History was successfully created.' }
        format.json { render json: @history, status: :created, location: @history }
      else
        format.html { render action: tours_path }
        format.json { render json: @history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /histories/1
  # PUT /histories/1.json
  def update
    @history = History.find(params[:id])
    @history.executed_date = Time.now

    respond_to do |format|
      if @history.update_attributes(params[:history])
        session[:history_id] = @history.id
        format.html { redirect_to "/mobile/floors?identity=#{@history.tour_id}", notice: 'History was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @history.errors, status: :unprocessable_entity }
      end
    end
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
