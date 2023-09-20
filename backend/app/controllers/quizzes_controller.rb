class QuizzesController < ApplicationController
    before_action :authenticate_user!, except: [:index]
    before_action :set_quiz, only: [:update, :destroy]

    def index
        page = params[:page] || 1
        per_page = params[:per_page] || 10 
      
        if params[:search] && params[:search] != ""
          quizzes = Quiz.where("name LIKE ? OR description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
        else
          quizzes = Quiz.all
        end
      
        quizzes = quizzes.paginate(page: page, per_page: per_page)
        total_pages = quizzes.total_pages
      
        render json: {
          quizzes: quizzes,
          current_page: page.to_i,
          total_pages: total_pages,
          total_items: quizzes.total_entries
        }
      end

    def show
        quiz = Quiz.find(params[:id])
        render json: {
            quiz: quiz,
            questions: quiz.questions,
            can_manage: quiz_belongs_to_current_user?(quiz)
        }
    end

    def create
        quiz_params = params.require(:quiz).permit(:name, :description)
        quiz = current_user.quizzes.build(quiz_params)
        if quiz.save
            render json: {
                quiz: quiz,
                status: :created
            }
        else
            render json: {error: quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        if quiz_belongs_to_current_user?
            quiz_params = params.require(:quiz).permit(:name, :description, :is_public)
            if @quiz.update(quiz_params)
                render json: {
                    quiz: @quiz,
                    status: :updated
                }
            else
                render json: {error: @quiz.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {error: "You don't have permission to edit this quiz."}, status: :unauthorized
        end
    end

    def destroy
        if quiz_belongs_to_current_user?
            @quiz.destroy
            render json: {
                quiz: @quiz,
                status: :deleted
            }
        else
            render json: {error: "You don't have permission to delete this quiz."}, status: :unauthorized
        end
    end

    private

    def set_quiz
        @quiz = Quiz.find(params[:id])
    end

    def quiz_belongs_to_current_user?(quiz = @quiz)
        puts "quiz.user: #{quiz.user}"
        puts "current_user: #{current_user}"
        quiz.user == current_user
    end

    
end
