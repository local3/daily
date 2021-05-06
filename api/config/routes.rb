Rails.application.routes.draw do
  # root 'static_pages/home'
  root to: 'static_pages#home'

  resources :users, only: [:create, :update]

  get '/current_user', to: 'sessions#current_user'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :languages, only: [:index]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
