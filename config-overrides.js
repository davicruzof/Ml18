const {
  alias
} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    "@utils": "src/utils",
    "@services": "src/services",
    "@pages": "src/pages",
    "@components": "src/components",
    "@assets": "src/assets"
  })(config)

  return config
}