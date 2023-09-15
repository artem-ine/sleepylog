class DropEntries < ActiveRecord::Migration[7.0]
  def change
    drop_table :logentries
  end
end
