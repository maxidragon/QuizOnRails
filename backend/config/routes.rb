Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :quizzes do
    get 'my' => 'quizzes#my', on: :collection
    resources :questions do
      resources :answers do 
        resources :user_answers
      end
    end
  end
end