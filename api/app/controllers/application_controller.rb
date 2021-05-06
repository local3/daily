class ApplicationController < ActionController::API
  # APIモードでは、Cookieを有効にするために要記載 https://qiita.com/k_kind/items/e26f03f4e24551b46b98
  include ActionController::Cookies

  # before_action :set_current_infos

  def current_user
    if session[:user_id]
        @current_user ||= User.find_by(id: session[:user_id])
    end
  end

  def login(user)
    session[:user_id] = user.id
  end

  def logout
    # logger.debug "logout"
    # logger.debug "消す前：#{session[:user_id]}, current_user：#{@current_user.inspect}"
    session.delete(:user_id)
    @current_user = nil
    # logger.debug "消した後：#{session[:user_id]}, current_user：#{@current_user.inspect}"
  end

  def logged_in?
    !current_user.nil?
  end

  private

      def require_login
        @current_user = User.find_by(id: session[:user_id])
        return if @current_user
    
        render json: { error: 'unauthorized' }, status: :unauthorized
      end

      def set_current_infos
        # cu=current_userの略
        @current_user = User.find_by(id: session[:user_id])
      end
end
