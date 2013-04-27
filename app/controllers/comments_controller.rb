class CommentsController < ApplicationController

  layout "mobile"

  # GET /comments
  # GET /comments.json
  def index
    @page = "comments"
    @comments = Comment.where('approved = ?', true).paginate(:per_page => 12, :page => params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    @comment = Comment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @comment }
    end
  end
end
