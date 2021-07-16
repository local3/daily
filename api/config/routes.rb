Rails.application.routes.draw do

  get 'memos/create'
  # ルートページ
  root to: 'static_pages#home'

  # ユーザー系
  resources :users, only: [:create]
  patch '/users/update', to: 'users#update'
  resources :password_resets, only: [:new, :edit]
  
  # 日記系
  resources :diaries, only: [:create]
  get '/diaries/exist_dates', to: 'diaries#exist_dates'
  get '/diaries/translate_text', to: 'diaries#translate_text'
  get '/diaries/:date', to: 'diaries#show'
  patch '/diaries/:date', to: 'diaries#update'

  # メモ系
  get '/memos/user_memos', to: 'memos#user_memos'
  resources :memos, only: [:create, :show, :update, :destroy]
  
  # 認証系
  get '/current_user', to: 'sessions#current_user'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # 言語系
  resources :languages, only: [:index]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
