FactoryBot.define do
	factory :empty_hypothesis, class: Hypothesis do
		dataset { [] }
	end

	factory :nil_hypothesis, class: Hypothesis do
		dataset { nil }
	end

	factory :invalid_hypothesis, class: Hypothesis do
		dataset { "qwerty" }
	end

	factory :invalid_points_hypothesis, class: Hypothesis do
		dataset { [{x: 5}, {y: 6}, {z: 1}, {}] }
	end

	factory :one_point_hypothesis, class: Hypothesis do
		dataset { [{x: 1, y: 1}] }
	end

	factory :two_point_hypothesis, class: Hypothesis do
		dataset { [{x: 1, y: 1}, {x: 2, y: 2}] }
	end

	factory :three_point_hypothesis, class: Hypothesis do
		dataset { [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}] }
	end
end
