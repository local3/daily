class PasswordResetsController < ApplicationController
  def new
  end

  def edit
  end

  def update
    user = User.find_by(email: params[:email])
    user.update(user_params)
  end

  private
    def user_params
      params.require(:user).permit(:password, :password_confirmation)
    end
end
