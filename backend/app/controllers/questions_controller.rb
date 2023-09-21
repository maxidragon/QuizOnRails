class QuestionsController < ApplicationController
    before_action :authenticate_user!

    def index
        questions = Question.where(quiz_id: params[:quiz_id]).includes(:answers)
        render json: questions.to_json(include: :answers)
    end

    def show
        question = Question.find(params[:id])
        render json: question
    end

    def create
        quiz = current_user.quizzes.find_by(id: params[:quiz_id])
        if quiz.present?
            question_params = params.require(:question).permit(:text, :quiz_id)
            question = quiz.questions.build(question_params)
            if question.save
                render json: {
                    question: question,
                    status: :created
                }
            else
                render json: {error: question.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {error: "Quiz not found"}, status: :not_found
        end
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
