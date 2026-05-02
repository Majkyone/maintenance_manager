// Author: Marián Šuľa
// Description: Functions defining dynamic schemas for task creation and filtering in the Device Maintenance Manager integration.
import { computed, ref, type Ref } from "vue";
interface Attributes {
    "control"?: string
    "options"?: string[],
    "unit"?: string,
    "option"?: string
}
// Function to define the schema for completion notes when completing a task.
export function useNotesSchema() {
    const schemaNotes = computed(() => [
        {
            name: "Completion Notes",
            required: false,
            selector: {
                text: {
                    multiline: true,
                },
            }
        }
    ]
    )
    return {
        schemaNotes
    }
}
// Function to define the dynamic schema for creating or editing a task with conditional fields based on user input.
export function useSchemaConditional(sensorAttributes: Ref<Attributes[] | null>, currentAttribute: any, duration: any, seasonal: any) {
    const schemaConditional = computed(() => [
        {
            name: "Task Name",
            required: true,
            selector: {
                text: {},
            },
        },
        {
            name: "Location",
            required: false,
            selector: {
                area: {},
            }
        },
        {
            name: "Description",
            required: false,
            selector: {
                text: {
                    multiline: true,
                },
            }
        },
        {
            name: "Sensor",
            required: true,
            selector: {
                entity: {
                }
            }
        },
        ...(sensorAttributes.value && sensorAttributes.value.length > 1 ? [
            {
                name: "Attribute",
                required: true,
                selector: {
                    select: {
                        options: sensorAttributes.value.map((attr: any) => attr.option),
                        mode: "dropdown"
                    },
                }
            },
        ] : []),
        ...(currentAttribute.value?.control === "number" ? [{
            name: "Operator",
            required: true,
            selector: {
                select: {
                    options: [
                        { value: "below", label: "Below" },
                        { value: "above", label: "Above" },
                        { value: "equal", label: "Equal" },
                    ],
                    mode: "dropdown"
                },
            },
        },
        {
            name: "Value",
            required: true,
            selector: {
                number: { mode: "box" }
            }
        },
        ] : []),

        ...(currentAttribute.value?.control === "select" ? [
            {
                name: "Value",
                required: true,
                selector: {
                    select: {
                        options: currentAttribute.value?.options,
                        mode: "list",
                        multiple: true
                    },
                }
            },
        ] : []),

        ...(currentAttribute.value?.control === "text" ? [
            {
                name: "Text",
                required: false,
                selector: {
                    constant: {
                        value: "No attributes found",
                        label: "No attributes found",
                    },
                },
            },
            {
                name: "Value",
                required: true,
                selector: {
                    text: {},
                },
            },
        ] : []),
        ...(currentAttribute.value?.control === "None" ? [
           {
                name: "Value",
                required: false,
                selector: {
                    constant: {
                        value: "No sensor found",
                        label: "No sensor found",
                    },
                },
            },
        ] : []),

        {
            name: "Condition Duration",
            required: false,
            selector: {
                boolean: {}
            }
        },
        ...(duration.value ? [
            {
                name: "Duration",
                required: duration.value,
                selector: {
                    number: { min: 1, mode: "box" }
                },
            },
            {
                name: "Duration Type",
                required: duration.value,
                selector: {
                    select: {
                        options: [
                            { value: "seconds", label: "Seconds" },
                            { value: "minutes", label: "Minutes" },
                            { value: "hours", label: "Hours" },
                        ],
                        mode: "dropdown"
                    },
                },
            },
        ] : []),
        {
            name: "Seasonal Task",
            required: false,
            selector: {
                boolean: {}
            }
        },
        ...(seasonal.value ? [
            {
                name: "Seasonal Interval",
                required: seasonal.value,
                selector: {
                    number: { min: 1, mode: "box" }
                },
            },
            {
                name: "Seasonal Type",
                required: seasonal.value,
                selector: {
                    select: {
                        options: [
                            { value: "minutes", label: "Minutes" },
                            { value: "weeks", label: "Weeks" },
                            { value: "months", label: "Months" },
                            { value: "years", label: "Years" },
                        ],
                        mode: "dropdown"
                    },
                },
            },
        ] : []),
    ]
    )
    return {
        schemaConditional
    };
}
// Function to define the schema for creating or editing an interval-based task with conditional fields based on user input.
export function useSchemaInterval(sensorAttributes: Ref<Attributes[] | null>, currentAttribute: any, runtime: any) {
    const schemaInterval = computed(() => [
        {
            name: "Task Name",
            required: true,
            selector: {
                text: {},
            },
            label: "Task Name (e.g. Oil Change)",
        },
        {
            name: "Location",
            required: false,
            selector: {
                area: {},
            }
        },
        {
            name: "Description",
            required: false,
            selector: {
                text: {
                    multiline: true,
                },
            }
        },
        {
            name: "Last Completed",
            required: false,
            selector: {
                date: {

                }
            }
        },
        {
            name: "Interval Type",
            required: true,
            selector: {
                select: {
                    options: [
                        { value: "days", label: "Days" },
                        { value: "weeks", label: "Weeks" },
                        { value: "months", label: "Months" },
                        { value: "years", label: "Years" },
                        { value: "runtime", label: "Runtime Based" },
                    ],
                    mode: "dropdown"
                },
            },
        },
        {
            name: "Repeat Every",
            required: true,
            selector: {
                number: { min: 1, mode: "box" }
            },
            hint: "Task Name (e.g. Oil Change)",
        },
        ...(!runtime.value ? [{
            name: "Fixed Interval",
            required: false,
            selector: {
                boolean: {}
            },
        },
        ] : []),
        ...(runtime.value ? [{
            name: "Sensor",
            required: true,
            selector: {
                entity: {
                    // domain: ["sensor", "binary_sensor"]
                }
            }
        },
        ] : []),
        ...(runtime.value && sensorAttributes.value && sensorAttributes.value.length > 1 ? [
            {
                name: "Attribute",
                required: true,
                selector: {
                    select: {
                        options: sensorAttributes.value.map((attr: any) => attr.option),
                        mode: "dropdown"
                    },
                }
            },
        ] : []),
        ...(runtime.value && currentAttribute.value?.control === "number" ? [{
            name: "Operator",
            required: true,
            selector: {
                select: {
                    options: [
                        { value: "below", label: "Below" },
                        { value: "above", label: "Above" },
                        { value: "equal", label: "Equal" },
                    ],
                    mode: "dropdown"
                },
            },
        },
        {
            name: "Value",
            required: true,
            selector: {
                number: { mode: "box" }
            }
        },
        ] : []),

        ...(runtime.value && currentAttribute.value?.control === "select" ? [
            {
                name: "Value",
                required: true,
                selector: {
                    select: {
                        options: currentAttribute.value?.options,
                        mode: "list",
                        multiple: true
                    },
                }
            },
        ] : []),
        ...(runtime.value && currentAttribute.value?.control === "None" ? [
            {
                name: "Value",
                required: false,
                selector: {
                    constant: {
                        value: "No sensor found",
                        label: "No sensor found",
                    },
                },
            },
        ] : []),

        ...(runtime.value && currentAttribute.value?.control === "text" ? [
            {
                name: "Text",
                required: false,
                selector: {
                    constant: {
                        value: "No attributes found",
                        label: "No attributes found",
                    },
                },
            },
            {
                name: "Value",
                required: true,
                selector: {
                    text: {},
                },
            },
        ] : []),
    ]
    )
    return {
        schemaInterval
    };
}
// Function to define the schema for filtering tasks based on selected criteria.
export function useSchemaFilter() {
    const schemaFilter = computed(() => [
        {
            name: "Select Filter",
            required: false,
            selector: {
                select: {
                    options: [
                        { value: "areas", label: "By Areas" },
                    ],
                    mode: "dropdown"
                },
            }
        }
    ]
    )
    return {
        schemaFilter
    };
}