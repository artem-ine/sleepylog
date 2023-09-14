Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get "member-data", to: "members#show"

# namespace :api, defaults: { format: :json } do
#   namespace :v1 do
#     devise_scope :user do
#       post 'auth/login', to: 'sessions#create'
#       delete 'auth/logout', to: 'sessions#destroy'
#     end
#     # Your other API routes go here
#   end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
    resources :articles, only: [:index] # Add other actions as needed

end
