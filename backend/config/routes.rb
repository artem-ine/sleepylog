Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
             }
  get '/member-data', to: 'members#show'
  post 'calculate_sleep_duration' => 'entries#sleep_duration_custom_range'
  post 'calculate_average_rating' => 'entries#average_rating_custom_range'
  get 'sleep_duration_past_week', to: 'entries#sleep_duration_past_week'
  get 'sleep_duration_past_month', to: 'entries#sleep_duration_past_month'
  get 'average_rating_past_week', to: 'entries#average_rating_past_week'
  get 'average_rating_past_month', to: 'entries#average_rating_past_month'

  resources :logbooks
  resources :entries
  resources :users
  resources :contacts, only: [:create]
end
