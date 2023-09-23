class RemoveUserForeignKeyFromUserAnswers < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :user_answers, column: :quiz_attempt_id, name: "fk_rails_..."
  end
end
