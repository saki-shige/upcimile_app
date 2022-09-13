Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'Company', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
        post 'creators' => 'creators#create'
        get 'creators' => 'creators#show'
      end

      resources :products
      resources :companies, only: [:index, :show, :update]
      resources :creators, only: [:index, :show]
      resources :offers, only: [:index,:create]
      put '/offers/:id', to: 'offers#accept'

      devise_scope :api_v1_company do
        post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end
    end
  end
end
