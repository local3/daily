class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email, unique: true
      t.string :password_digest
      t.string :remember_digest
      t.string :activation_digest
      t.string :reset_digest
      t.boolean :admin
      t.boolean :activated
      t.datetime :reset_sent_at
      t.references :language, foreign_key: true

      t.timestamps
    end
    add_index :users, :email
  end
end
