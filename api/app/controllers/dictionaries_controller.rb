class DictionariesController < ApplicationController

  def user_dictionaries
    return render json: {dictionaries: @current_user.dictionaries, state: "success", msg:"Success"}
  end

  def create
    dic = @current_user.dictionaries.build(diary_params)
    dic.save
    return render json: {dictionary: dic , state:"success", msg:"Success"}
  end

  def show
    dic = Dictionary.where(id: @current_user.id)
  end

  private
  def diary_params
    params.require(:dictionary).permit(:word, :description)
  end
end
