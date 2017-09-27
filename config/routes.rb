Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "events#landing"

  resources :events, only: [:index, :show, :new, :create, :landing] do
    resources :timeslots, only: [:create, :destroy]
  end
  resources :preferences, only: [:update]

end
