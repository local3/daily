const genRequiredMsg = (validateTarget: string): string => {
  return `${validateTarget}は必須です`
}

const genInvalidFormatMsg = (validateTarget: string, format: string): string => {
  return `${validateTarget}は、${format}の形式のみ入力可能です`
}

export const helperTexts = {
  REQUIRE_EMAIL: genRequiredMsg('メールアドレス'),
  INVALID_EMAIL_FORMAT: genInvalidFormatMsg('メールアドレス', 'アドレス@ドメイン名'),
  REQUIRE_PASSWORD: genRequiredMsg('パスワード'),
  INVALID_PASSWORD_FORMAT: genInvalidFormatMsg('パスワード', '6文字以上'),
  REQUIRE_PASSWORD_CONFIRMATION: genRequiredMsg('確認用パスワード'),
  INCORRECT_PASSWORD_CONFIRMATION: 'パスワードと確認用パスワードが異なります'
}