class ChangeUserAnswersUserIdToQuizAttemptId < ActiveRecord::Migration[7.0]
  def change
    rename_column :user_answers, :user_id, :quiz_attempt_id
    add_foreign_key :user_answers, :quiz_attempts
  end
end