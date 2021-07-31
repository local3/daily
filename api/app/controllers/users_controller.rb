class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    login(user) if user.save!
    return render json: {data: user, state:"success",msg:"Success"} , status: 200
  end

  def update
    # logger.debug @current_user.inspect
    # logger.debug params
    if params[:session]
      # logger.debug 'user取得前'
      user = User.find_by(email: params[:session][:email].downcase)
      # logger.debug(user.inspect)
      # logger.debug 'user取得後'
    else
      return render json: {data: user, state:"success",msg:"本人確認が入力されていません"} , status: 422
    end

    return render json: {data: user, state:"success",msg:"有効な値ではありません"} , status: 422 if params[:session][:language_id]

    # logger.debug 'authenticate前'
    if user && user.authenticate(params[:session][:password])
      # logger.debug 'authenticate後'
      # logger.debug(user.inspect)
      user.update!(user_params)
      # logger.debug @current_user.inspect
      if user == @current_user
        render json: {data: user, state:"success",msg:"変更できました"} , status: 200
      else
        render json: {data: user, state:"success",msg:"userが存在しません、またはログインユーザーと一致しませんでした"} , status: 422
      end
    else
      render json: {data: user, state:"success",msg:"userが存在しません、またはログインユーザーと一致しませんでした"} , status: 422
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :language_id)
    end
end
