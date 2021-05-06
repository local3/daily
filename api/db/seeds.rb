# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Language.create(
  [
    {
      name: '英語'
    },
    {
      name: '韓国語'
    },
    {
      name: '中国語'
    },
    {
      name: 'フランス語'
    },
  ]
)