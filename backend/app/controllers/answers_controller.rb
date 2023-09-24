class AnswersController < ApplicationController
  before_action :authenticate_user!

  def create
    question = Question.find_by(id: params[:question_id], quiz_id: params[:quiz_id])

    if question.present?
      answer_params = params.require(:answer).permit(:text, :is_correct)
      answer = question.answers.build(answer_params)

      if answer.save
        render json: {
                 answer: answer,
                 status: :created,
               }, status: :created
      else
        render json: { error: answer.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Question not found" }, status: :not_found
    end
  end

  def update
    answer = Answer.find(params[:id])
    if answer.present? && answer.question.quiz.user == current_user
      answer_params = params.require(:answer).permit(:text, :is_correct)
      if answer.update(answer_params)
        render json: {
                 answer: answer,
                 status: :updated,
               }
      else
        render json: { error: answer.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Answer not found" }, status: :not_found
    end
  end

  def destroy
    answer = Answer.find(params[:id])
    if answer.present? && answer.question.quiz.user == current_user
      answer.destroy
      render json: {
               answer: answer,
               status: :deleted,
             }
    else
      render json: { error: "Answer not found" }, status: :not_found
    end
  end
end
