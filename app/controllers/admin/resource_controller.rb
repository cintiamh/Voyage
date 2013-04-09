class Admin::ResourceController < Admin::ApplicationController
  inherit_resources
  respond_to :html

  self.responder = Admin::Responder

  layout "admin"
end
