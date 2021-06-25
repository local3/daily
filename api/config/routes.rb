Rails.application.routes.draw do
  # root 'static_pages/home'
  root to: 'static_pages#home'

  resources :users, only: [:create]
  resources :diaries, only: [:create]
  resources :password_resets, only: [:new, :edit]

  patch '/users/update', to: 'users#update'
  get '/diaries/exist_dates', to: 'diaries#exist_dates'
  get '/diaries/:date', to: 'diaries#show'
  get '/current_user', to: 'sessions#current_user'
  patch '/diaries/:date', to: 'diaries#update'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :languages, only: [:index]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
