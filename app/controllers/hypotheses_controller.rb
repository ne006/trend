class HypothesesController < ApplicationController
	protect_from_forgery with: :exception, unless: -> { request.format.json? }

  def new
  end

  def create
		@hypothesis = Hypothesis.new(dataset: params['points'])
		@hypothesis.process
  end
end
