require "rails_helper"

RSpec.describe QuizzesController, type: :controller do
  describe "GET #my" do
    context "when the user is authenticated" do
      it "returns a successful response" do
        user = create(:user)
        sign_in user
        get :my
        expect(response).to have_http_status(:success)
      end
    end

    context "when the user is not authenticated" do
      it "returns an unauthorized response" do
        get :my
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET #index" do
    context "when the user is authenticated" do
      it "returns a successful response" do
        user = create(:user)
        sign_in user
        get :index
        expect(response).to have_http_status(:success)
      end
    end

    context "when the user is not authenticated" do
      it "returns a successful response" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "POST #create" do
    context "when the user is authenticated" do
      it "creates a quiz" do
        user = create(:user)
        sign_in user
        expect do
          post :create, params: { quiz: { name: "New Quiz", description: "New Quiz Description" } }
        end.to change(Quiz, :count).by(1)
      end
    end

    context "when the user is not authenticated" do
      it "returns an unauthorized response" do
        expect do
          post :create, params: { quiz: { name: "New Quiz", description: "New Quiz Description" } }
        end.to change(Quiz, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET #show" do
    context "when the quiz exists" do
      it "returns a successful response" do
        quiz = FactoryBot.create(:quiz)
        sign_in quiz.user
        get :show, params: { id: quiz.id }
        expect(response).to have_http_status(:success)
      end
    end

    context "when the quiz does not exist" do
      it "returns a not_found response" do
        sign_in create(:user)
        get :show, params: { id: 9999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "PUT #update" do
    context "when the quiz exists and belongs to the user" do
      it "updates a quiz" do
        quiz = FactoryBot.create(:quiz)
        sign_in quiz.user
        put :update, params: { id: quiz.id, quiz: { name: "Updated Quiz" } }
        quiz.reload
        expect(quiz.name).to eq("Updated Quiz")
      end
    end

    context "when the quiz exists but does not belong to the user" do
      it "returns an unauthorized response" do
        user = create(:user)
        another_user = create(:user)
        sign_in another_user
        another_quiz = create(:quiz, user: user)
        put :update, params: { id: another_quiz.id, quiz: { name: "Updated Quiz" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when the quiz does not exist" do
      it "returns a not_found response" do
        sign_in create(:user)
        put :update, params: { id: 9999, quiz: { name: "Updated Quiz" } }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "DELETE #destroy" do
    context "when the quiz exists and belongs to the user" do
      it "destroys the requested quiz" do
        quiz = FactoryBot.create(:quiz)
        sign_in quiz.user
        delete :destroy, params: { id: quiz.id }
        expect(response).to have_http_status(:success)
      end
    end

    context "when the quiz exists but does not belong to the user" do
      it "returns an unauthorized response" do
        user = create(:user)
        another_user = create(:user)
        sign_in another_user
        another_quiz = create(:quiz, user: user)
        delete :destroy, params: { id: another_quiz.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when the quiz does not exist" do
      it "returns a not_found response" do
        sign_in create(:user)
        delete :destroy, params: { id: 9999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "GET #stats" do
    context "when the quiz exists and belongs to the user" do
      it "returns a successful response" do
        quiz = FactoryBot.create(:quiz)
        sign_in quiz.user
        get :stats, params: { id: quiz.id }
        expect(response).to have_http_status(:success)
      end
    end

    context "when the quiz exists but does not belong to the user" do
      it "returns not found" do
        user = create(:user)
        another_user = create(:user)
        sign_in another_user
        another_quiz = create(:quiz, user: user)
        get :stats, params: { id: another_quiz.id }
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the quiz does not exist" do
      it "returns a not_found response" do
        sign_in create(:user)
        get :stats, params: { id: 9999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
