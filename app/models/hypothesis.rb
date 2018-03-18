class Hypothesis
	attr_reader :dataset, :result

	def initialize(dataset: [])
		dataset = [] unless dataset
		validate_dataset(dataset)
		@dataset = dataset
		@result = {}
	end

	#Process dataset
	def process
		return result unless dataset.size > 1

		@result = calc_linear_regression
	end

	private

	def validate_dataset(dataset)
		raise ArgumentError, "Dataset is not a collection" unless dataset.respond_to? :each
		errors = []
		dataset.each do |element|
			errors.push "#{element} is not a Hash" &&
				next unless element.is_a? Hash
			errors.push "#{element} does not have :x or :y" &&
				next unless element.has_key?(:x) && element.has_key?(:y)
			errors.push "#{element}'s :x or :y is not a Numeric" &&
				next unless element.fetch(:x).is_a?(Numeric) && element.fetch(:y).is_a?(Numeric)
		end
		raise ArgumentError, errors.join("\n") unless errors.empty?
	end

	#linear
	def calc_linear_regression
		k0 = (dataset.map { |point| point.fetch(:y) }.reduce(:+) *
			dataset.map { |point| point.fetch(:x) }.reduce(0) { |sum, x| sum + x**2 } -
			dataset.reduce(0) { |sum, point| sum + point.fetch(:x)*point.fetch(:y) } *
			dataset.map { |point| point.fetch(:x) }.reduce(:+)) /
			(dataset.size *
			dataset.map { |point| point.fetch(:x) }.reduce(0) { |sum, x| sum + x**2 } -
			dataset.map { |point| point.fetch(:x) }.reduce(:+)**2)
		k1 = (dataset.size *
			dataset.reduce(0) { |sum, point| sum + point.fetch(:x)*point.fetch(:y) } -
			dataset.map { |point| point.fetch(:y) }.reduce(:+) *
			dataset.map { |point| point.fetch(:x) }.reduce(:+)) /
			(dataset.size *
			dataset.map { |point| point.fetch(:x) }.reduce(0) { |sum, x| sum + x**2 } -
			dataset.map { |point| point.fetch(:x) }.reduce(:+)**2)
		{
			"0": k0,
			"1": k1
		}
	end
end
