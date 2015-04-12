class AddStatusToWorks < ActiveRecord::Migration
  def change
    add_column :works, :status, :boolean,  default: false
  end
end
