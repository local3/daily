class SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    # authenticateメソッドは、has_secure_passwordが提供するメソッド。認証ができないとfalseを返す。
    if user && user.authenticate(params[:session][:password])
      login(user)
      logger.debug ('ろぐいん')
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      # @current_user ||= User.find_by(id: session[:user_id])
      return render json: {data: @current_user, state:"success",msg:"ログインに成功しました"} , status: 200
    else
      logger.debug('のっとろぐいん')
      return render json: {data: nil, state:"success",msg:"メールアドレスまたは、パスワードが一致しません"} , status: 422
    end
  end

  def destroy
    logout if logged_in?
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
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
