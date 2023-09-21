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
        question = Question.find_by(id: params[:question_id], quiz_id: params[:quiz_id])
        
        if question.present?
          answer_params = params.require(:answer).permit(:text, :is_correct)
          answer = question.answers.build(answer_params)
      
          if answer.save
            render json: {
              answer: answer,
              status: :created
            }
          else
            render json: { error: answer.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: "Question not found" }, status: :not_found
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
