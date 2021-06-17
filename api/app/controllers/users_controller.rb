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
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :language_id)
    end
end
