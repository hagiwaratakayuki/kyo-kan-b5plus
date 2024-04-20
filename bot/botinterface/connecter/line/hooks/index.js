const hooks = [
    require('./selection').SelectionHook
]

module.exports = Object({}, ...hooks)