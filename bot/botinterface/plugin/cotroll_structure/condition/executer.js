
/**
 * @typedef {import("./protocol").Condition[]} Conditions
 * @typedef {{index:number, conditions:Conditions, result?:any, stepResults:Object.<number, any>}} LogicLayer
*/
/** 
 * @template TargetValueType
 * @typedef {(nowResult?:any, targetValue:TargetValueType) => {isBreak:boolean, result:any}} OperaterFunction
 * 
 */
class Executer {
    /**
     * 
     * @param {Conditions} condtions
     * @param {Object<string, OperaterFunction<any>>} executers  
     */
    constructor(conditions, executers) {
        this._conditions = conditions
        /**
         * @property {Object.<string, O<any>>}
         */
        this._executers = executers
    }
    run() {
        let depth = 0

        /**
         * @type {LogicLayer[]}
         */
        const layars = [this._createInitConditionLayer(this._conditions)]
        let targetLayer = layars[depth]
        let isConditionExists = true
        let result;

        while (isConditionExists === true) {
            while (targetLayer.index < targetLayer.conditions.length) {
                const condition = targetLayer.conditions[targetLayer.index]
                let targetValue;



                if (typeof condition.subConditions !== "undefined") {
                    if (targetLayer.index in targetLayer.stepResults === false) {
                        const subLayer = this._createInitConditionLayer(condition.subConditions)
                        layars.push(subLayer);
                        continue

                    }
                    targetValue = targetLayer.ste


                }
                else {
                    //値取得ロジック書く
                }
                targetLayer.index += 1;
                const isFirst = 'result' in targetLayer == false
                if (isFirst == true) {
                    targetLayer.result = targetValue
                }
                else {
                    const { isBreak, result } = this._executers[condition.operater](targetLayer.result, targetValue)
                    targetLayer.result = result
                    if (isBreak == true) {
                        break;

                    }
                }





            }
            if (depth == 0) {
                isConditionExists = false
                result = layars[0].result

            }
            else {
                depth -= 1
                targetLayer = layars[depth]
                const finishedLayer = layars.pop()
                targetLayer.stepResults[targetLayer.index] = finishedLayer.result

            }


        }
        return result
    }
    /**
     * 
     * @param {*} conditions 
     * @returns {LogicLayer}
     */
    _createInitConditionLayer(conditions) {
        return { index: 0, conditions, stepResults: {} }
    }

}
/**
 * @type {{[k in import("./protocol").Operater]:(result, t) }}
 */
const operateLogics = {

}