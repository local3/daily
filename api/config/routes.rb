Rails.application.routes.draw do
  # root 'static_pages/home'
  root to: 'static_pages#home'

  resources :users, only: [:create, :update]
  resources :diaries, only: [:create]

  get '/user_diaries', to: 'diaries#user_diaries'
  get '/diaries/:date', to: 'diaries#show'
  get '/current_user', to: 'sessions#current_user'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :languages, only: [:index]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
