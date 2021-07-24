const STATUS_CODES = {
  // リセット
  RESET_CODE: 0,
  // 何も処理しない
  FLAT_CODE: 1,
  // 成功
  SUCCESS_CODE: 200,
  // 自作ステータスコード　infoアラート
  INFO_CODE: 210,
  // アクセスエラー（URLミス, etc.）
  NOT_FOUND_CODE: 404,
  // バリデーションエラー
  INVALID_CODE: 422,
  // サーバーエラー
  SERVER_ERROR_CODE: 500
}
export default STATUS_CODES
