const handlers = [
    require('./selection').SelectionHook,
    require('./YN').YNHook,
    require('./message').MessageHook

]

module.exports = Object({}, ...handlers)