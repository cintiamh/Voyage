class CreatorsController < ApplicationController
  # GET /creators
  # GET /creators.json
  def index
    @creators = Creator.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @creators }
    end
  end

  # GET /creators/1
  # GET /creators/1.json
  def show
    @creator = Creator.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @creator }
    end
  end

  # GET /creators/new
  # GET /creators/new.json
  def new
    @creator = Creator.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @creator }
    end
  end

  # GET /creators/1/edit
  def edit
    @creator = Creator.find(params[:id])
  end

  # POST /creators
  # POST /creators.json
  def create
    @creator = Creator.new(params[:creator])

    respond_to do |format|
      if @creator.save
        format.html { redirect_to @creator, notice: 'Creator was successfully created.' }
        format.json { render json: @creator, status: :created, location: @creator }
      else
        format.html { render action: "new" }
        format.json { render json: @creator.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /creators/1
  # PUT /creators/1.json
  def update
    @creator = Creator.find(params[:id])

    respond_to do |format|
      if @creator.update_attributes(params[:creator])
        format.html { redirect_to @creator, notice: 'Creator was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @creator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /creators/1
  # DELETE /creators/1.json
  def destroy
    @creator = Creator.find(params[:id])
    @creator.destroy

    respond_to do |format|
      format.html { redirect_to creators_url }
      format.json { head :no_content }
    end
  end
end
