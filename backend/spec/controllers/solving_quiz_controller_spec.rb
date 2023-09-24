require "rails_helper"

RSpec.describe SolvingQuizController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  let(:quiz) { FactoryBot.create(:quiz) }
  let(:question) { FactoryBot.create(:question, quiz: quiz) }
  let(:answer) { FactoryBot.create(:answer, question: question) }
  let(:quiz_attempt) { FactoryBot.create(:quiz_attempt, user: user, quiz: quiz, is_active: true) }
  let(:user_answer) { FactoryBot.create(:user_answer, answer: answer, quiz_attempt: quiz_attempt) }

  before do
    sign_in user
  end

  describe "POST #start_quiz" do
    it "creates a new quiz attempt" do
      post :start_quiz, params: { quiz_id: quiz.id }
      expect(response).to have_http_status(:success)
      expect(QuizAttempt.where(user: user, quiz: quiz, is_active: true).count).to eq(1)
    end

    it "returns an error if the user has already started the quiz" do
      FactoryBot.create(:quiz_attempt, user: user, quiz: quiz, is_active: true)
      post :start_quiz, params: { quiz_id: quiz.id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include("error" => "You have already started this quiz")
    end
  end

  describe "GET #get_info_with_questions" do
    it "returns quiz information with questions and answers" do
      get :get_info_with_questions, params: { quiz_id: quiz.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("questions")
    end
  end

  describe "GET #get_answers" do
    it "returns user answers for the quiz" do
      quiz_attempt = FactoryBot.create(:quiz_attempt, user: user, quiz: quiz, is_active: true)
      get :get_answers, params: { quiz_id: quiz_attempt.quiz.id }
      expect(response).to have_http_status(:success)
    end

    it "returns an error if the user has not started the quiz" do
      quiz_attempt.update(is_active: false)
      get :get_answers, params: { quiz_id: quiz.id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include("error" => "You have not started this quiz")
    end
  end

  describe "POST #submit_answer" do
    it "submits a user answer" do
      quiz_attempt = FactoryBot.create(:quiz_attempt, user: user, quiz: quiz, is_active: true)
      post :submit_answer, params: { quiz_id: quiz_attempt.quiz.id, answer_id: answer.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("quiz_attempt_id" => quiz_attempt.id)
    end

    it "updates an existing user answer" do
      FactoryBot.create(:user_answer, quiz_attempt: quiz_attempt, answer: answer)
      post :submit_answer, params: { quiz_id: quiz.id, answer_id: answer.id }
      expect(response).to have_http_status(:success)
    end

    it "returns an error if the user has not started the quiz" do
      quiz_attempt.update(is_active: false)
      post :submit_answer, params: { quiz_id: quiz.id, answer_id: answer.id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include("error" => "You have not started this quiz")
    end
  end

  describe "POST #finish_quiz" do
    it "finishes the quiz" do
      quiz_attempt = FactoryBot.create(:quiz_attempt, user: user, quiz: quiz, is_active: true)
      post :finish_quiz, params: { quiz_id: quiz_attempt.quiz.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("score")
    end
    it "returns an error if the user has not started the quiz" do
      quiz_attempt.update(is_active: false)
      post :finish_quiz, params: { quiz_id: quiz.id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include("error" => "You have not started this quiz")
    end
  end

  describe "GET #get_results" do
    it "returns quiz attempt results" do
      get :get_results, params: { quiz_attempt_id: quiz_attempt.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("score")
    end

    it "returns an error if the user is not allowed to see the results" do
      another_user = FactoryBot.create(:user)
      another_quiz_attempt = FactoryBot.create(:quiz_attempt, user: another_user, quiz: quiz)
      get :get_results, params: { quiz_attempt_id: another_quiz_attempt.id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include("error" => "You are not allowed to see this quiz attempt")
    end
  end
end
