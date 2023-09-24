class SolvingQuizController < ApplicationController
  before_action :authenticate_user!

  def start_quiz
    quiz = Quiz.find(params[:quiz_id])
    quiz_attempt_params = { user_id: current_user.id, quiz_id: quiz.id, started_at: DateTime.now }
    if quiz.quiz_attempts.find_by(user_id: current_user.id, is_active: true, quiz_id: quiz.id)
      render json: { error: "You have already started this quiz" }, status: :unprocessable_entity
      return
    end
    quiz_attempt = quiz.quiz_attempts.build(quiz_attempt_params)
    if quiz_attempt.save
      render json: quiz_attempt
    else
      render json: { error: quiz_attempt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def get_info_with_questions
    quiz = Quiz.find(params[:quiz_id])
    render json: quiz.as_json(
      include: {
        questions: {
          include: {
            answers: {
              only: [:id, :text],
            },
          },
        },
      },
    )
  end

  def get_answers
    quiz = Quiz.find(params[:quiz_id])
    user_answers = quiz.quiz_attempts.find_by(user_id: current_user.id, is_active: true, quiz_id: quiz.id).user_answers
    render json: user_answers.as_json(
      include: {
        answer: {
          only: [:id, :question_id],
        },
      },
    )
  end

  def submit_answer
    quiz = Quiz.find(params[:quiz_id])
    quiz_attempt = quiz.quiz_attempts.find_by(user_id: current_user.id, is_active: true, quiz_id: quiz.id)
    if !quiz_attempt
      render json: { error: "You have not started this quiz" }, status: :unprocessable_entity
      return
    end
    user_answer_params = { quiz_attempt_id: quiz_attempt.id, answer_id: params[:answer_id] }
    question = Answer.find(params[:answer_id]).question
    user_answer_exist = quiz_attempt.user_answers.find_by(quiz_attempt_id: quiz_attempt.id, answer: question.answers)
    if user_answer_exist
      user_answer = quiz_attempt.user_answers.find_by(quiz_attempt_id: quiz_attempt.id, answer: question.answers)
      if user_answer.update(user_answer_params)
        render json: user_answer
      else
        render json: { error: user_answer.errors.full_messages }, status: :unprocessable_entity
      end
    else
      user_answer = quiz_attempt.user_answers.build(user_answer_params)
      if user_answer.save
        render json: user_answer
      else
        render json: { error: user_answer.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def finish_quiz
    quiz_attempt = QuizAttempt.find(params[:quiz_attempt_id])
    quiz_attempt.user_answers.each do |user_answer|
      if user_answer.answer.correct
        quiz_attempt.score += 1
      end
    end
    quiz_attempt.is_active = false
    quiz_attempt.finished_at = DateTime.now
    quiz_attempt.save
    render json: quiz_attempt
  end
end
