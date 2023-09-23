class ChangeUserAnswersForeignKey < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :user_answers, column: :quiz_attempt_id, to_table: :users
    add_foreign_key :user_answers, :quiz_attempts, column: :quiz_attempt_id
  end
end
