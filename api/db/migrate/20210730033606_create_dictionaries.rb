class CreateDictionaries < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionaries do |t|
      t.references :user, foreign_key: true
      t.references :language, foreign_key: true
      t.text :word
      t.text :description
      
      t.timestamps
    end
  end
end
