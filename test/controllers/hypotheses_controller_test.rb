require 'test_helper'

class HypothesesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get hypotheses_new_url
    assert_response :success
  end

  test "should get create" do
    get hypotheses_create_url
    assert_response :success
  end

end
