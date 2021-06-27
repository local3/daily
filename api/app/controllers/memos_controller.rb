class MemosController < ApplicationController

  def user_memos
    return render json: {memos: @current_user.memos, state: "success"}
  end

  def create
    logger.debug "Aaa"
    logger.debug memo_params
    memo = @current_user.memos.build(memo_params)
    memo.save
    return render json: {memo: memo , state:"success", msg:"Success"}
  end

  def show
    memo = Memo.find_by(id: params[:id])
    return render json: memo
  end

  def update
    memo = Memo.find_by(id: params[:id])
    memo.update(memo_params)
    return render json: {memo: memo , state:"success", msg:"Success"}
  end

  def destroy
    memo = Memo.find_by(id: params[:id])
    memo.destroy
  end

  private
    def memo_params
      params.require(:memo).permit(:content)
    end
end
