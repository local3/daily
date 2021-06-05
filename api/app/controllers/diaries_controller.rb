class DiariesController < ApplicationController
  def user_diaries
    diaries = @current_user.diaries

    return diaries
  end

  def create
    # date_param = params[:diary][:date].split('-').map(&: to_i)
    # date = Date.new(date_param[0], date_param[1], date_param[2])
    # logger.debug date
    logger.debug diary_params
    logger.debug diary_content_params
    logger.debug Diary.column_names
    diary = @current_user.diaries.build(diary_params)
    diary.save
    diary_content = diary.diary_contents.build(diary_content_params)
    diary_content.save
    return render json: {diary: diary, diary_content: diary_content ,state:"success",msg:"Success"}
  end

  def show
    logger.debug params
    diary = Diary.find_by(user_id: @current_user.id, date: params[:date])
    return render json: {diary: diary, state:"success",msg:"Success"}
    
  end

  private
    def diary_params
      # date_param = params[:diary][:date].split('-').map(&:to_i)
      # date = Date.new(date_param[0], date_param[1], date_param[2])
      # logger.debug date
      # params[:diary][:date] = date
      params.require(:diary).permit(:ja_content, :date)
    end
    
    def diary_content_params
      params.require(:diary_content).permit(:language_id, :content)
    end
end
