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
      resources :answers
    end
  end

  get 'quizzes/:quiz_id/start' => 'solving_quiz#start_quiz'
  get 'quizzes/:quiz_id/info' => 'solving_quiz#get_info_with_questions'
  post 'quizzes/:quiz_id/submit' => 'solving_quiz#submit_answer'
  post 'quizzes/:quiz_id/finish' => 'solving_quiz#finish_quiz'

end