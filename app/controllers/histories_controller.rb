class HistoriesController < InheritedResources::Base
  # GET /histories
  # GET /histories.json
  def index
    @histories = History.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tour_histories }
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

    #params[:history][:tour_item_ids][0]
    @tour = Tour.find(@history.tour.id)
    index = 0
    if @tour.tour_items.length > 0
      temp_arr = []
      @tour.tour_items.each do |item|
        if item.fixed
          @history.tour_items << TourItem.find(item.id)
        else

        end
      end
      #  if item.fixed
      #    @history.tour_items << TourItem.find(item.id)
      #    index += 1
      #  else
      #    if item.position == current_pos
      #      temp_arr.push(item.id)
      #    else
      #      @history.tour_items << TourItem.find(temp_arr.sample(1))
      #      #params[:history][:tour_item_ids][index] = temp_arr.sample(1)
      #      index += 1
      #      temp_arr = []
      #      temp_arr.push(item.id)
      #      current_pos = item.position
      #    end
      #  end
      #end
    end

    respond_to do |format|
      if @history.save
        format.html { redirect_to @history, notice: 'History was successfully created.' }
        format.json { render json: @history, status: :created, location: @history }
      else
        format.html { render action: "new" }
        format.json { render json: @history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /histories/1
  # PUT /histories/1.json
  def update
    @history = History.find(params[:id])

    respond_to do |format|
      if @history.update_attributes(params[:history])
        format.html { redirect_to @history, notice: 'History was successfully updated.' }
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
