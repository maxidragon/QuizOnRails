class AddDescriptionToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :description, :text
  end
end
