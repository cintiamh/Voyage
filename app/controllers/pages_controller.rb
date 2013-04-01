
class PagesController < ApplicationController
  def index

  end

  def identities

    @tours = Tour.all
    js :params => {:tours_list => @tours}

    #js :params => {:tours_list => @tours}
    #js :controller => 'pages', :action => 'identities'

  end

end
