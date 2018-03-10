Rails.application.routes.draw do
	root 'hypotheses', controller: :hypotheses, action: :new

  get 'hypotheses', controller: :hypotheses, action: :new
  post 'hypotheses', controller: :hypotheses, action: :new

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
