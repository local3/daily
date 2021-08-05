# API対応翻訳言語一覧
# https://cloud.google.com/translate/docs/languages
Language.create(
  [
    {
      name: '英語',
      code: 'en'
    },
    {
      name: '韓国語',
      code: 'ko'
    },
    {
      name: '中国語',
      code: 'zh'
    },
    {
      name: 'フランス語',
      code: 'fr'
    },
  ]
)
# logger.debug Language.all
User.create!(email: 'test1@example.com', password: 'test1', password_confirmation: 'test1', language_id: Language.first.id)