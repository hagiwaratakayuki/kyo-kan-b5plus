const { BindHandler } = require('../../../connecter/handlerutil')



const handlers = [
    require('./selection').SelectionHook,
    require('./YN').YNHook,
    require('./message').MessageHook

]

module.exports = BindHandler(handlers)