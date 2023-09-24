require "rails_helper"

RSpec.describe AnswersController, type: :controller do
  let(:user) { create(:user) }
  let(:quiz) { create(:quiz, user: user) }
  let(:question) { create(:question, quiz: quiz) }

  before do
    sign_in user
  end

  describe "POST #create" do
    it "creates a new answer" do
      sign_in user
      answer_params = { text: "Sample Answer", is_correct: true }
      post :create, params: { quiz_id: quiz.id, question_id: question.id, answer: answer_params }
      expect(response).to have_http_status(:created)
    end

    it "returns an error for invalid answer" do
      sign_in user
      answer_params = { text: "", is_correct: true }
      post :create, params: { quiz_id: quiz.id, question_id: question.id, answer: answer_params }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns an error for question not found" do
      sign_in user
      answer_params = { text: "Sample Answer", is_correct: true }
      post :create, params: { quiz_id: quiz.id, question_id: 999, answer: answer_params }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "PUT #update" do
    let(:answer) { create(:answer, question: question) }

    it "updates the answer" do
      sign_in user
      updated_text = "Updated Answer Text"
      put :update, params: { quiz_id: question.quiz.id, question_id: question.id, id: answer.id, answer: { text: updated_text } }
      expect(response).to have_http_status(:ok)
      expect(Answer.find(answer.id).text).to eq(updated_text)
    end

    it "returns an error for invalid answer update" do
      sign_in user
      invalid_text = ""
      put :update, params: { quiz_id: question.quiz.id, question_id: question.id, id: answer.id, answer: { text: invalid_text } }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns an error if the user is not the owner of the answer" do
      another_user = create(:user)
      sign_in another_user
      put :update, params: { quiz_id: question.quiz.id, question_id: question.id, id: answer.id, answer: { text: "Updated Answer Text" } }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "DELETE #destroy" do
    let(:answer) { create(:answer, question: question) }

    it "deletes the answer" do
      sign_in user
      delete :destroy, params: { quiz_id: question.quiz.id, question_id: question.id, id: answer.id }
      expect(response).to have_http_status(:ok)
      expect(Answer.exists?(answer.id)).to be_falsey
    end

    it "returns an error if the user is not the owner of the answer" do
      another_user = create(:user)
      sign_in another_user
      delete :destroy, params: { quiz_id: question.quiz.id, question_id: question.id, id: answer.id }
      expect(response).to have_http_status(:not_found)
    end
  end
end
