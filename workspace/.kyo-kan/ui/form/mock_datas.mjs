export const datas = {
    "testYN": {
        questionType: "yn",
        data: {
            description: "Yes No"
        }
    },
    "testInlinetext": {
        questionType: "inlinetext",
        data: {
            description: "Inline Text",
            hint: "de pint"
        }
    },
    "testText": {
        questionType: "text",
        data: {
            description: "Text",
            hint: "de pint"
        }
    },
    "testSelectmulti": {
        questionType: "selectmulti",

        data: {
            description: "Select Multi",
            selectOptions: [
                {
                    value: "test",
                    label: "test label 1"
                },
                {
                    value: "test2",
                    label: "test label 2",
                    isSelected: true
                },
                {
                    value: "test3",
                    label: "test label 3",

                }

            ]
        }
    },
    "testSelectone": {
        questionType: "selectone",

        data: {
            description: "Select One",
            selectOptions: [
                {
                    value: "test",
                    label: "test label 1"
                },
                {
                    value: "test2",
                    label: "test label 2",

                },
                {
                    value: "test3",
                    label: "test label 3",

                }

            ]
        }
    }
}