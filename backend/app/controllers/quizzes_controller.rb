class QuizzesController < ApplicationController
    before_action :authenticate_user!

    def index
        quizzes = current_user.quizzes
        render json: quizzes
    end

    def show
        quiz = Quiz.find(params[:id])
        render json: quiz
    end

    def create
        quiz = current_user.quizzes.build(quiz_params)
        if quiz.save
            render json: quiz
        else
            render json: {error: quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        quiz = Quiz.find(params[:id])
        if quiz.update(quiz_params)
            render json: quiz
        else
            render json: {error: quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        quiz = Quiz.find(params[:id])
        quiz.destroy
        render json: quiz
    end
    
end
