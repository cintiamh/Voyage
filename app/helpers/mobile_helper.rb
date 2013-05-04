module MobileHelper

  def save_comment
    @comment = Comment.new(params[:comment])

    respond_to do |format|
      if @comment.save
        # format.html { redirect_to "/", notice: 'Comment was successfully created.' }
        # format.json { render json: @comment, status: :created, location: @comment }
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

end
