class AddIsPublicToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :is_public, :boolean
  end
end
