RSpec.describe QuestionsController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  let(:quiz) { FactoryBot.create(:quiz, user: user) }
  let(:question) { FactoryBot.create(:question, quiz: quiz) }
  let(:valid_question_params) { { text: "Sample Question", quiz_id: quiz.id } }
  let(:invalid_question_params) { { text: "", quiz_id: quiz.id } }

  before do
    sign_in user
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: { quiz_id: quiz.id }
      expect(response).to be_successful
    end

    it "returns a list of questions for the quiz" do
      get :index, params: { quiz_id: quiz.id }
      expect(JSON.parse(response.body)).to eq(quiz.questions.as_json(include: :answers))
    end

    it "returns a 'not found' response if quiz does not belong to the current user" do
      other_user = FactoryBot.create(:user)
      other_quiz = FactoryBot.create(:quiz, user: other_user)
      get :index, params: { quiz_id: other_quiz.id }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "Quiz not found" })
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { quiz_id: quiz.id, id: question.id }
      expect(response).to be_successful
    end

    it "returns the requested question" do
      get :show, params: { quiz_id: quiz.id, id: question.id }
      expect(JSON.parse(response.body)).to eq(question.as_json)
    end

    it "returns a 'not found' response if quiz or question does not belong to the current user" do
      other_user = FactoryBot.create(:user)
      other_quiz = FactoryBot.create(:quiz, user: other_user)
      other_question = FactoryBot.create(:question, quiz: other_quiz)
      get :show, params: { quiz_id: other_quiz.id, id: other_question.id }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "Question not found" })
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new question" do
        expect {
          post :create, params: { quiz_id: quiz.id, question: valid_question_params }
        }.to change(Question, :count).by(1)
      end

      it "returns a 'created' response" do
        post :create, params: { quiz_id: quiz.id, question: valid_question_params }
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      it "does not create a new question" do
        expect {
          post :create, params: { quiz_id: quiz.id, question: invalid_question_params }
        }.to_not change(Question, :count)
      end

      it "returns an 'unprocessable entity' response" do
        post :create, params: { quiz_id: quiz.id, question: invalid_question_params }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    it "returns a 'not found' response if quiz does not belong to the current user" do
      other_user = FactoryBot.create(:user)
      other_quiz = FactoryBot.create(:quiz, user: other_user)
      post :create, params: { quiz_id: other_quiz.id, question: valid_question_params }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "Quiz not found" })
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      it "updates the requested question" do
        new_text = "Updated Question Text"
        put :update, params: { quiz_id: quiz.id, id: question.id, question: { text: new_text } }
        question.reload
        expect(question.text).to eq(new_text)
      end

      it "returns a 'success' response" do
        put :update, params: { quiz_id: quiz.id, id: question.id, question: valid_question_params }
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid params" do
      it "does not update the question" do
        original_text = question.text
        put :update, params: { quiz_id: quiz.id, id: question.id, question: invalid_question_params }
        question.reload
        expect(question.text).to eq(original_text)
      end

      it "returns an 'unprocessable entity' response" do
        put :update, params: { quiz_id: quiz.id, id: question.id, question: invalid_question_params }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    it "returns a 'not found' response if quiz or question does not belong to the current user" do
      other_user = FactoryBot.create(:user)
      other_quiz = FactoryBot.create(:quiz, user: other_user)
      other_question = FactoryBot.create(:question, quiz: other_quiz)
      put :update, params: { quiz_id: other_quiz.id, id: other_question.id, question: valid_question_params }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "Question not found" })
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested question" do
      question = FactoryBot.create(:question, quiz: quiz)
      delete :destroy, params: { quiz_id: question.quiz.id, id: question.id }
      expect(response).to have_http_status(:success)
    end

    it "returns a 'success' response" do
      delete :destroy, params: { quiz_id: quiz.id, id: question.id }
      expect(response).to have_http_status(:success)
    end

    it "returns a 'not found' response if quiz or question does not belong to the current user" do
      other_user = FactoryBot.create(:user)
      other_quiz = FactoryBot.create(:quiz, user: other_user)
      other_question = FactoryBot.create(:question, quiz: other_quiz)
      delete :destroy, params: { quiz_id: other_quiz.id, id: other_question.id }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "Question not found" })
    end
  end
end
