class Admin::CommentsController < Admin::ResourceController
  # GET /comments
  # GET /comments.json
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @comments = Comment.paginate(:per_page => 10, :page => params[:all_page]).order("created_at desc")
    @comments_pieces = Comment.where("piece_id > 0").paginate(:per_page => 10, :page => params[:pieces_page]).order("created_at desc")
    @comments_tours = Comment.where("tour_id > 0").paginate(:per_page => 10, :page => params[:tours_page]).order("created_at desc")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @comment = Comment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.json
  def new
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @comment = Comment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  # GET /comments/1/edit
  def edit
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @comment = Comment.find(params[:id])
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(params[:comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to admin_comments_url, notice: 'Comment was successfully created.' }
        format.json { render json: @comment, status: :created, location: @comment }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to admin_comments_url, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = Comment.find(params[:id])
    unless @comment.present?
      @comment.destroy
    end

    respond_to do |format|
      format.html { redirect_to admin_comments_url }
      format.json { head :no_content }
    end
  end
end
