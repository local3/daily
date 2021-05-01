class CreateDiaries < ActiveRecord::Migration[6.0]
  def change
    create_table :diaries do |t|
      t.references :user, foreign_key: true
      t.text :ja_content

      t.timestamps
    end
  end
end
