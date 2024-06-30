function ClassConstructBuilder(cls) {
    return _constructer.bind({ cls })
}

function _constructer(options, commonOptions, language, functionMap) {
    return new this.cls(options, commonOptions, language, functionMap)
}


module.exports = { ClassConstructBuilder }