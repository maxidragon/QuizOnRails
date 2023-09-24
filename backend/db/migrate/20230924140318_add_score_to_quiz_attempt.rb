class AddScoreToQuizAttempt < ActiveRecord::Migration[7.0]
  def change
    add_column :quiz_attempts, :score, :integer
  end
end
