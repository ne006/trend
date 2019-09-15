module.exports = {
  test: /\.haml$/,
  use: [
    {
      loader: "haml-plain-loader"
    }
  ]
}
