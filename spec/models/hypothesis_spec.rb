require 'rails_helper'

RSpec.describe Hypothesis, type: :model do
  describe "#new" do
  	context "with valid dataset" do
			it "returns new Hypothesis" do
				expect(Hypothesis.new(attributes_for(:two_point_hypothesis))).to be_a Hypothesis
			end

			it "assings dataset" do
				expect(Hypothesis.new(attributes_for(:two_point_hypothesis)).dataset).
				to eql(attributes_for(:two_point_hypothesis)[:dataset])
			end
  	end

		context "with nil dataset" do
			it "returns new Hypothesis with an empty dataset" do
				hypothesis = Hypothesis.new(attributes_for(:nil_hypothesis))
				expect(hypothesis).to be_a Hypothesis
				expect(hypothesis.dataset).to eql(Array.new)
			end

			it "assigns empty dataset" do
				expect(Hypothesis.new(attributes_for(:nil_hypothesis)).dataset).
				to eql(Array.new)
			end
		end

		context "with invalid dataset" do
			it "raises ArgumentError" do
				expect { Hypothesis.new(attributes_for(:invalid_hypothesis)) }.
				to raise_error ArgumentError
			end
		end

		context "with invalid points in dataset" do
			it "raises ArgumentError" do
				expect { Hypothesis.new(dataset: attributes_for(:invalid_points_hypothesis)) }.
				to raise_error ArgumentError
			end
		end
  end

	describe "#process" do
		context "with empty dataset" do
			it "returns empty hash" do
				expect(Hypothesis.new(attributes_for(:empty_hypothesis)).process).
				to eql(Hash.new)
			end

			it "assigns empty result" do
				hypothesis = Hypothesis.new(attributes_for(:empty_hypothesis))
				hypothesis.process
				expect(hypothesis.result).to eql(Hash.new)
			end
		end

		context "with dataset of one point" do
			it "returns empty hash" do
				expect(Hypothesis.new(attributes_for(:one_point_hypothesis)).process).
				to eql(Hash.new)
			end

			it "assigns empty result" do
				hypothesis = Hypothesis.new(attributes_for(:one_point_hypothesis))
				hypothesis.process
				expect(hypothesis.result).to eql(Hash.new)
			end
		end

		context "with dataset of two points" do
			it "returns hash with keys '0' and '1'" do
				result = Hypothesis.new(attributes_for(:two_point_hypothesis)).process
				expect(result).to have_key(:'0').or(have_key(:'1'))
			end

			it "assigns result" do
				hypothesis = Hypothesis.new(attributes_for(:two_point_hypothesis))
				hypothesis.process
				expect(hypothesis.result).to have_key(:'0').or(have_key(:'1'))
			end
		end

		context "with dataset of three points" do
			context "with dataset of two points" do
				it "returns hash with keys '0' and '1'" do
					result = Hypothesis.new(attributes_for(:three_point_hypothesis)).process
					expect(result).to have_key(:'0').or(have_key(:'1'))
				end

				it "assigns result" do
					hypothesis = Hypothesis.new(attributes_for(:three_point_hypothesis))
					hypothesis.process
					expect(hypothesis.result).to have_key(:'0').or(have_key(:'1'))
				end
			end
		end
	end
end
