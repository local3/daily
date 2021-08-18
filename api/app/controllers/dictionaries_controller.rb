class DictionariesController < ApplicationController

  def user_dictionaries
    return render json: {dictionaries: @current_user.dictionaries, state: "success", msg:"Success"}
  end

  def create
    dic = @current_user.dictionaries.build(dictionary_params)
    dic.save
    return render json: {state:"success", msg:"My辞書に登録しました。"}, status: 200
  end

  def destroy
    dic = Dictionary.find_by(id: params[:id])
    return render json: {state:"success", msg:"削除に成功しました。"}, status: 200 if dic.destroy
  end

  def translate_word
    translate = Google::Cloud::Translate::V2.new
    language = Language.find_by(id: params[:language_id])
    description = translate.translate(params[:word], from: language.code, to: 'ja')
    return render json: CGI.unescapeHTML(description.text)
  end

  private
  def dictionary_params
    params.permit(:word, :description, :language_id,)
  end
end
