class CreateQuizAttempts < ActiveRecord::Migration[7.0]
  def change
    create_table :quiz_attempts do |t|
      t.integer :user_id, null: false
      t.integer :quiz_id, null: false
      t.datetime :started_at
      t.datetime :finished_at
      t.boolean :is_active, default: true, null: false

      t.timestamps
    end

    add_foreign_key :quiz_attempts, :users
    add_foreign_key :quiz_attempts, :quizzes
  end
end
