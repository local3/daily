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
    
    # {date: '○曜日, YYYY年MM月DD日', class_names: ['class1', 'class2']}
    # ↑の形式の要素からなる日記情報を格納した配列を生成
    exist_diarys_info = diaries.inject([]) do |results, current_diary|
      # 日にちを整形
      parsed_date = Date.parse(current_diary.date.to_s)
      arranged_date = parsed_date.strftime("#{getJaDay(parsed_date)}曜日, %Y年#{removeHeadZero(parsed_date.mon)}月#{removeHeadZero(parsed_date.mday)}日")
      # 各外国語日記から、内容を取り出し一旦配列にする(可読性のため)
      total_content = current_diary.diary_contents.pluck(:content)
      # 配列を一つの文章としてつなげ、その長さを取得
      total_content_length = total_content.join(',').length
      # get_class_nameメソッドで、文字列の長さからどのクラスを付与するか決定する
      arranged_diary = {date: arranged_date, class_names: get_class_name(total_content_length)}
      # 生成した要素を結果に格納
      results << arranged_diary
    end

    return render json: {exist_diarys_info: exist_diarys_info, state: "success", msg: "Success"}, status: 220
  end

  def create
    # date_param = params[:diary][:date].split('-').map(&: to_i)
    # date = Date.new(date_param[0], date_param[1], date_param[2])
    # logger.debug date
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

  # 翻訳用のAPIを叩く。
  # フロント側でAPIキーを使う処理をしてしまうと、キーの漏洩の危険が高まるので、バックでAPIキーを使う処理は行うようにする
  def translate_text
    logger.debug "translate_text"
    translate = Google::Cloud::Translate::V2.new
    language = Language.find_by(id: params[:language_id])
    translation = translate.translate(params[:ja_content], from: 'ja', to: language.code)
    # CGIをつかってアンエスケープ。Transition APIの戻り値はHTMLエスケープ文字列となっているので、それを解除
    return render json: CGI.unescapeHTML(translation.text) 
  end
  
  private
    def get_class_name(total_content_length)
      logger.debug total_content_length
      case
      when total_content_length > 600
        return ['exist_date', 'max_length']
      when total_content_length > 400
        return ['exist_date', 'more_length']
      when total_content_length > 200
        return ['exist_date', 'middle_length']
      when total_content_length > 50
        return ['exist_date', 'min_length']
      when total_content_length >= 0
        return ['exist_date']
      end
    end

    def diary_params
      params.require(:diary).permit(:ja_content, :date)
    end
    
    def diary_content_params
      params.require(:diary_content).permit(:language_id, :content)
    end
end
