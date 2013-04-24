class Admin::DashboardController < Admin::ResourceController
  def index
    unless current_user.try(:admin?)
      redirect_to "/"
    end
    @page = "dashboard#index"
    @comments = Comment.recent
    @tour_histories = TourHistory.recent
    @users = User.recent
  end
end
