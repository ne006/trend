require 'rails_helper'

RSpec.describe Hypothesis, type: :model do
  describe "#new" do
  	context "with valid dataset" do
			it "returns new Hypothesis" do
				expect(Hypothesis.new(attributes_for(:two_point_hypothesis))).to be_a Hypothesis
			end
  	end

		context "with invalid dataset" do
			it "raises ArgumentError" do
				expect { Hypothesis.new(attributes_for(:invalid_hypothesis)) }.to raise_error ArgumentError
			end
		end

		context "with invalid points in dataset" do
			it "raises ArgumentError" do
				expect { Hypothesis.new(dataset: attributes_for(:invalid_points_hypothesis)) }.to raise_error ArgumentError
			end
		end

		context "with nil dataset" do
			it "returns new Hypothesis with an empty dataset" do
				hypothesis = Hypothesis.new(attributes_for(:nil_hypothesis))
				expect(hypothesis).to be_a Hypothesis
				expect(hypothesis.dataset).to eql([])
			end
		end
  end

	describe "#process" do
		context "with empty dataset" do

		end

		context "with dataset of one point" do

		end

		context "with dataset of two points" do

		end

		context "with dataset of three points" do

		end
	end
end
