class CreateDiaryContents < ActiveRecord::Migration[6.0]
  def change
    create_table :diary_contents do |t|
      t.references :diary, foreign_key: true
      t.references :language, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
