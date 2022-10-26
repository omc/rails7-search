class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :name
      t.date :published_at
      t.string :description
      t.string :publisher
      t.references :genre, foreign_key: true
      t.references :author, foreign_key: true

      t.timestamps
    end
  end
end
