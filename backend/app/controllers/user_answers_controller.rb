class UserAnswersController < ApplicationController
    before_action :authenticate_user!

    def show
        authorize_user_answer
        user_answer = UserAnswer.find(params[:id])
        render json: user_answer
    end

    def create
        user = User.find(params[:user_id])
        quiz = Quiz.find(params[:quiz_id])
        question = Question.find(params[:question_id])
        answer = Answer.find(params[:answer_id])
        user_answer = user.user_answers.build(user_answer_params)
        if user_answer.save
            render json: user_answer
        else
            render json: {error: user_answer.errors.full_messages}, status: :unprocessable_entity
        end
    end

end
