
const { ClassBase } = require("../../../utility/clsbase")


class Step extends ClassBase {

    /**
     * 
     * @param {number} step 
     * @param {import("../../../../../kyo-kan/context").Context} context 
     */
    _moveRelative(step, context) {
        const data = context.getData() || {}
        const now = data.position || 0 + step
        if (now < 0) {
            return false

        }
        data.position = now
        context.setData(data)
        return this._getTarget(now, context)




    }
    /**
     * 
     * @param {number} step 
     * @param {import("../../../../../kyo-kan/context").Context} context 
     */
    _moveTo(position, context) {
        const data = context.getData() || {}
        data[this.options.positionKey || "position"] = position

        context.setData(data)
        return this._getTarget(position, context)




    }
    _getTarget(position, context) {
        return ((context.getData() || {})[this.options.stepKey || "steps"] || [])[position]

    }

}


module.exports = { Step }