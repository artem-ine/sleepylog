class AddLikeToEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :entries, :like, :boolean, default: false
  end
end
