class CreateLogEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :logentries do |t|
      t.integer :rating
      t.float :duration
      t.datetime :start_time
      t.datetime :end_time
      t.text :notes

      t.references :logbook, null: false, foreign_key: true

      t.timestamps
    end
  end
end
