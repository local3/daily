class DiariesController < ApplicationController
  def user_diaries
    diaries = @current_user.diaries

    return diaries
  end

  def create
    diary = @current_user.diaries.build(diary_params)
    diary_content = diary.diary_contents.build(diary_content_params)
  end

  def show
    logger.debug params
    diary = Diary.find_by(user_id: @current_user.id, date: params[:date])
    return render json: {diary: diary, state:"success",msg:"Success"}
    
  end

  private
    def diary_params
      params.require(:diary).permit(:ja_content)
    end

    def diary_content_params
      params.require(:diary_content).permit(:language_id, :content)
    end
end
