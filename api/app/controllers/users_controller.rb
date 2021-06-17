class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save!
        logger.debug "save"
        login(user)
    else
        logger.debug "not save"
    end
    return render json: {data: user, state:"success",msg:"Success"} , status: 200
  end

  def update
    if params[:session]
      user = User.find_by(email: params[:session][:email].downcase)
      logger.debug(user.inspect)
    else
      return "本人確認が入力されていません"
    end
    
    if user && user.authenticate(params[:session][:password])
      logger.debug(user.inspect)
      user.update!(user_params)
      if user == @current_user
        "変更できました"
      else
        "user存在しません、またはログインユーザーと一致しませんでした"
      end
    else
      "user存在しません、またはログインユーザーと一致しませんでした"
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :language_id)
    end
end
