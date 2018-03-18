require 'rails_helper'

RSpec.describe "Hypotheses", type: :request do
	before { subj_request }
  describe "GET /hypotheses.json" do
		let(:subj_request) { get hypotheses_path, as: :json }
    it "is successful" do
      expect(response).to have_http_status(200)
    end

		it "returns an empty hash" do
			expect(json_response).to eql(Hash.new)
		end
  end

	describe "POST /hypotheses" do
		context "with one point" do
			let(:subj_request) { post hypotheses_path, params: {points: attributes_for(:one_point_hypothesis)[:dataset]}, as: :json }
			it "is successful" do
				expect(response).to have_http_status(200)
			end

			it "returns an empty hash" do
				expect(json_response['hypothesis']).to eql(Hash.new)
			end
		end

		context "with two points" do
			let(:subj_request) { post hypotheses_path, params: {points: attributes_for(:two_point_hypothesis)[:dataset]}, as: :json }
			it "is successful" do
				expect(response).to have_http_status(200)
			end

			it "returns resulting hash" do
				expect(json_response['hypothesis']).not_to eql(Hash.new)
			end
		end

		context "with three points do" do
			let(:subj_request) { post hypotheses_path, params: {points: attributes_for(:three_point_hypothesis)[:dataset]}, as: :json }
			it "is successful" do
				expect(response).to have_http_status(200)
			end

			it "returns resulting array" do
				expect(json_response['hypothesis']).not_to eql(Hash.new)
			end
		end
	end
end
