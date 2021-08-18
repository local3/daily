class UsersController < ApplicationController
  def create
    user = User.new(signup_user_params)
    login(user) if user.save!
    return render json: {data: user, state:"success",msg:"Success"} , status: 200
  end

  # def update
  #   # logger.debug @current_user.inspect
  #   # logger.debug params
  #   if params[:session]
  #     # logger.debug 'user取得前'
  #     user = User.find_by(email: params[:session][:email].downcase)
  #     # logger.debug(user.inspect)
  #     # logger.debug 'user取得後'
  #   else
  #     return render json: {data: user, state:"success",msg:"本人確認が入力されていません"} , status: 422
  #   end

  #   return render json: {data: user, state:"success",msg:"有効な値ではありません"} , status: 422 if params[:session][:language_id]

  #   # logger.debug 'authenticate前'
  #   if user && user.authenticate(params[:session][:password])
  #     # logger.debug 'authenticate後'
  #     # logger.debug(user.inspect)
  #     user.update!(user_params)
  #     # logger.debug @current_user.inspect
  #     if user == @current_user
  #       render json: {data: user, state:"success",msg:"変更できました"} , status: 200
  #     else
  #       render json: {data: user, state:"success",msg:"userが存在しません、またはログインユーザーと一致しませんでした"} , status: 422
  #     end
  #   else
  #     render json: {data: user, state:"success",msg:"userが存在しません、またはログインユーザーと一致しませんでした"} , status: 422
  #   end
  # end

  def update
    target = params[:user][:target]
    case target

    when 'email'
      if @current_user.update!(filter_user_update_params(target))
        return render json: {data: @current_user, state:"success", msg:"メールアドレスを更新しました"} , status: 200
      end
    when 'password'
      
      if @current_user && @current_user.authenticate(params[:user][:old_password])
        if @current_user.update!(filter_user_update_params(target))
          return render json: {data: @current_user, state:"success", msg:"パスワードを更新しました"} , status: 200
        end
      else
        return render json: {data: nil, state:"success", msg:"古いパスワードが一致しません"} , status: 422
      end

    when 'other'
      logger.debug "berfore other"
      # logger.debug target
      @current_user.update!(filter_user_update_params(target))
      logger.debug "after other"
    end
  end

  private
    def user_params
      # params.require(:user).permit(
      #   :target,
      #   :old_password,
      #   email: 
      #     [
      #       :email
      #     ],
      #   password: 
      #   [
      #     :password,
      #     :password_confirmation
      #   ]
      # )
      params.require(:user)
      # .require(
      #   :target,
      #   :old_password,
      #   :email,
      #   :password,
      #   :other
      # )
    end

    def signup_user_params
      user_params.permit(:email, :password, :password_confirmation, :language_id)
    end

    # targetの値と一致するkeyのvalueのみを返す
    # これをしないと、{target: "other", password: {password: "hoge", password_confirmation: "fuga"}}
    # のような場合にcase文でotherにはいってold_passwordの確認手順などを回避できてしまう。
    def filter_user_update_params(target)
      # update対象(target)についてのvalueのみを取得
      # requireは、指定したキーについてのvalueのみを絞るだけ
      # permitは、指定したキーとバリューのみの使用を許可する。
      logger.debug "user_params"
      logger.debug user_params
      target_filter_user_params = user_params.require(target.to_sym)
      # それぞれのtargetでupdateできるカラムをpermitしていく
      case target
      when 'email'
        target_filter_user_params.permit(:email)

      when 'password'
        target_filter_user_params.permit(:password, :password_confirmation)
  
      when 'other'
        logger.debug "filter other"
        target_filter_user_params.permit(:language_id)
      end
    end
end
