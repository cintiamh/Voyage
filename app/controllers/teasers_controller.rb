class TeasersController < ApplicationController
  # GET /teasers
  # GET /teasers.json
  def index
    @teasers = Teaser.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @teasers }
    end
  end

  # GET /teasers/1
  # GET /teasers/1.json
  def show
    @teaser = Teaser.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @teaser }
    end
  end

  # GET /teasers/new
  # GET /teasers/new.json
  def new
    @teaser = Teaser.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @teaser }
    end
  end

  # GET /teasers/1/edit
  def edit
    @teaser = Teaser.find(params[:id])
  end

  # POST /teasers
  # POST /teasers.json
  def create
    @teaser = Teaser.new(params[:teaser])

    respond_to do |format|
      if @teaser.save
        format.html { redirect_to @teaser, notice: 'Teaser was successfully created.' }
        format.json { render json: @teaser, status: :created, location: @teaser }
      else
        format.html { render action: "new" }
        format.json { render json: @teaser.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /teasers/1
  # PUT /teasers/1.json
  def update
    @teaser = Teaser.find(params[:id])

    respond_to do |format|
      if @teaser.update_attributes(params[:teaser])
        format.html { redirect_to @teaser, notice: 'Teaser was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @teaser.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teasers/1
  # DELETE /teasers/1.json
  def destroy
    @teaser = Teaser.find(params[:id])
    @teaser.destroy

    respond_to do |format|
      format.html { redirect_to teasers_url }
      format.json { head :no_content }
    end
  end
end
