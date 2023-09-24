class QuizzesController < ApplicationController
  before_action :require_login, except: [:index]

  def my
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    if params[:search] && params[:search] != ""
      quizzes = current_user.quizzes.where("name LIKE ? OR description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
    else
      quizzes = current_user.quizzes
    end
    quizzes = quizzes.paginate(page: page, per_page: per_page)
    total_pages = quizzes.total_pages
    render json: {
             quizzes: quizzes,
             current_page: page.to_i,
             total_pages: total_pages,
             total_items: quizzes.total_entries,
           }
  end

  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10

    if params[:search] && params[:search] != ""
      quizzes = Quiz.where("name LIKE ? OR description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%").where(is_public: true)
    else
      quizzes = Quiz.where(is_public: true)
    end

    quizzes = quizzes.paginate(page: page, per_page: per_page)
    total_pages = quizzes.total_pages

    render json: {
             quizzes: quizzes,
             current_page: page.to_i,
             total_pages: total_pages,
             total_items: quizzes.total_entries,
           }
  end

  def show
    begin
      quiz = Quiz.find(params[:id])
      if quiz.user == current_user
        render json: {
                 quiz: quiz,
                 can_manage: quiz_belongs_to_current_user?(quiz),
               }
      else
        render json: { error: "Quiz not found" }, status: :not_found
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Quiz not found" }, status: :not_found
    end
  end

  def create
    quiz_params = params.require(:quiz).permit(:name, :description)
    quiz = current_user.quizzes.build(quiz_params)
    if quiz.save
      render json: {
               quiz: quiz,
               status: :created,
             }
    else
      render json: { error: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    quiz = Quiz.find_by(id: params[:id])
    if quiz.nil?
      render json: { error: "Quiz not found" }, status: :not_found
    elsif quiz.user != current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    else
      quiz_params = params.require(:quiz).permit(:name, :description)
      if quiz.update(quiz_params)
        render json: {
          quiz: quiz,
          status: :updated,
        }
      else
        render json: { error: quiz.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    quiz = Quiz.find_by(id: params[:id])
    if quiz.nil?
      render json: { error: "Quiz not found" }, status: :not_found
    elsif quiz.user != current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    else
      quiz.destroy
      render json: {
        quiz: quiz,
        status: :deleted,
      }, status: :ok
    end
  end

  private

  def quiz_belongs_to_current_user?(quiz = nil)
    quiz ||= Quiz.find(params[:id])
    quiz.user == current_user
  end

  def require_login
    unless current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
