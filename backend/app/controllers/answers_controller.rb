class AnswersController < ApplicationController
    before_action :authenticate_user!
    
    def index
        answers = Answer.find(params[:question_id])
        render json: answers
    end

    def show
        answer = Answer.find(params[:id])
        render json: answer
    end

    def create
        question = Question.find(params[:question_id], user: current_user)

        if question.present?
            answer = question.answers.build(answer_params)
            authorize_answer
            if answer.save
                render json: answer
            else
                render json: {error: answer.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {error: "Question not found"}, status: :not_found
        end
    end

    def update
        answer = Answer.find(params[:id])
        authorize_answer
        if answer.update(answer_params)
            render json: answer
        else
            render json: {error: answer.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        answer = Answer.find(params[:id])
        authorize_answer
        answer.destroy
        render json: answer
    end
    
end
