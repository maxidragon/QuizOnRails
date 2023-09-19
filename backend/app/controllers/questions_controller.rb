class QuestionsController < ApplicationController
    before_action :authenticate_user!

    def index
        questions = Question.find(params[:quiz_id])
        render json: questions
    end

    def show
        question = Question.find(params[:id])
        render json: question
    end

    def create
        quiz = current_user.quizzes.find_by(id: params[:quiz_id])
        if quiz.present?
            question = quiz.questions.build(question_params)
            authorize_question
            if question.save
                render json: question
            else
                render json: {error: question.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {error: "Quiz not found"}, status: :not_found
        end

    def update
        question = Question.find(params[:id])
        authorize_question
        if question.update(question_params)
            render json: question
        else
            render json: {error: question.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        question = Question.find(params[:id])
        authorize_question
        question.destroy
        render json: question
    end

end
