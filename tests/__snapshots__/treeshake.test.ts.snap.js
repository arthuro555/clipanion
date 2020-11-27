exports[`Tree shaking : should only keep the command Options used in the bundle 1`] = "const isOptionSymbol = Symbol(`clipanion/isOption`);\nfunction makeCommandOption(spec) {\n    // We lie! But it's for the good cause: the cli engine will turn the specs into proper values after instantiation.\n    return { ...spec, [isOptionSymbol]: true };\n}\nfunction rerouteArguments(a, b) {\n    if (typeof a === `undefined`)\n        return [a, b];\n    if (typeof a === `object` && a !== null && !Array.isArray(a)) {\n        return [undefined, a];\n    }\n    else {\n        return [a, b];\n    }\n}\n\nfunction Array$1(descriptor, initialValueBase, optsBase) {\n    const [initialValue, opts] = rerouteArguments(initialValueBase, optsBase !== null && optsBase !== void 0 ? optsBase : {});\n    const { arity = 1 } = opts;\n    const optNames = descriptor.split(`,`);\n    const nameSet = new Set(optNames);\n    return makeCommandOption({\n        definition(builder) {\n            builder.addOption({\n                names: optNames,\n                arity,\n                hidden: opts === null || opts === void 0 ? void 0 : opts.hidden,\n                description: opts === null || opts === void 0 ? void 0 : opts.description,\n            });\n        },\n        transformer(builder, key, state) {\n            let currentValue = typeof initialValue !== `undefined`\n                ? [...initialValue]\n                : undefined;\n            for (const { name, value } of state.options) {\n                if (!nameSet.has(name))\n                    continue;\n                currentValue = currentValue !== null && currentValue !== void 0 ? currentValue : [];\n                currentValue.push(value);\n            }\n            return currentValue;\n        }\n    });\n}\n\nArray$1();\n";