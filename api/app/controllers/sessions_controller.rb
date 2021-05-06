class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:session][:email])
    # logger.debug user.inspect
    # logger.debug params.inspect
    # logger.debug session.inspect

    # authenticateメソッドは、has_secure_passwordが提供するメソッド。認証ができないとfalseを返す。
    if user && user.authenticate(params[:session][:password])
      # logger.debug "login before"
      login(user)
    else
    end
  end

  def destroy
    logout
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
    # logger.debug "session current_user"
    # logger.debug session.inspect
    # logger.debug @current_user
    # logger.debug "after current_user"
    # logger.debug session[:user_id]
    if @current_user
      return render json: {data: @current_user, session: session.inspect, state:"success",msg:"Success"} , status: 200
    else
      return render json: {data: nil, session: session.inspect, state:"danger", msg:"not exist current_user"} , status: 200
    end
  end

  private

    def session_params
      params.fetch(:session, {}).permit(:email, :password)
    end
end
