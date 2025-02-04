const { ClassBasicTemplate } = require('../../../pattern/class_basic');
/**
 * @template functionMapType, optionType
 * @extends {ClassBasicTemplate<functionMapType, optionType>}
*/
class StandardizedFormViewBasic extends ClassBasicTemplate {




    in(request, context, stateController) {



        const loopData = context.getLoopData();

        /**
         * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
         * */
        const ret = {
            clientResponse: {
                message: loopData.message,
                title: loopData.title,

            }
        };
        return ret;

    }



}

module.exports = { StandardizedFormViewBasic }