class Admin::DashboardController < Admin::ResourceController
  def index
    @page = "dashboard#index"
    @comments = Comment.recent
    @tour_histories = TourHistory.recent
    @users = User.recent
  end
end
