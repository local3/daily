class DiariesController < ApplicationController
  # 日にち変換用
  require "date"
  # HTML文字列アンエスケープ用
  require 'cgi'
  # 翻訳機能
  require "google/cloud/translate/v2"

  require_relative "../utils/date.rb"
  require_relative "../utils/string.rb"

  def exist_dates
    diaries = @current_user.diaries
    exist_dates = diaries.pluck(:date).map do |exist_date|
      parsed_date = Date.parse(exist_date.to_s)
      parsed_date.strftime("#{getJaDay(parsed_date)}曜日, %Y年#{removeHeadZero(parsed_date.mon)}月#{removeHeadZero(parsed_date.mday)}日")
    end
    return render json: {exist_dates: exist_dates, state:"success", msg:"Success"}
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
    diary = Diary.find_by(user_id: @current_user.id, date: params[:date]).as_json(include: :diary_contents)
    return render json: {diary: diary, state:"success",msg:"Success"}
  end

  def update
    logger.debug params
    diary = Diary.find_by(user_id: @current_user.id, date: params[:date])
    diary_content = diary.diary_contents
    logger.debug(diary)
    logger.debug(diary_content)
    diary.update(diary_params)
    diary_content.update(diary_content_params)
    return render json: {diary: diary, diary_content: diary_content, state:"success",msg:"Success"}
  end

  def translate_text
    translate = Google::Cloud::Translate::V2.new
    language = Language.find_by(id: params[:language_id])
    translation = translate.translate(params[:ja_content], from: 'ja', to: language.code)
    # CGIをつかってアンエスケープ
    return render json: CGI.unescapeHTML(translation.text) 
  end

  private
    def diary_params
      params.require(:diary).permit(:ja_content, :date)
    end
    
    def diary_content_params
      params.require(:diary_content).permit(:language_id, :content)
    end
end
