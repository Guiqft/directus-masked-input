<template>
    <div class="masked-input">
        <v-input ref="input" @input="handleInput" :disabled="disabled" />
        <p v-if="errorMessage">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"
import { useStores } from "@directus/extensions-sdk"
import { Field } from "@directus/shared/types"
import IMask, { AnyMaskedOptions } from "imask"
import { isCnpj, isCpf } from "validator-brazil"

const useDirectusField = (collection: string, fieldName: string): Field => {
    const stores = useStores()
    return stores.useFieldsStore().getField(collection, fieldName)
}

const useInterfaceDisabled = (
    pk: string,
    collection: string,
    fieldName: string
) => {
    const disabled = ref(false)
    const field = useDirectusField(collection, fieldName)

    onMounted(() => {
        // If aren't creating a new item
        if (pk !== "+") {
            // Get field edit config to disable the input
            disabled.value = Boolean(field.meta?.readonly)
        } else {
            disabled.value = Boolean(!field.meta?.required)
        }
    })
    return disabled
}

export const number = (value: number | string): string => {
    if ((!value && value !== 0) || typeof value !== "number") {
        return "0"
    }

    // https://stackoverflow.com/a/14428340
    return value
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
}

const currencyFormatter = (
    value: number | string,
    {
        currencyPrefix = false,
        asFloat = false,
    }: { currencyPrefix?: boolean; asFloat?: boolean } = {}
): number | string | null => {
    if (typeof value === "string") {
        if (value.length > 0) {
            value = value.replace(/\D/g, "")
            value = "00" + value
            value = value.replace(/(\d*)(\d{2})/, "$1.$2")
        } else {
            // returning null to prevent returns of "0.00" when value is empty
            return null
        }
    }

    value = parseFloat(value?.toString()) || 0.0
    if (asFloat) {
        return value
    }
    const sign = value < 0 ? "-" : ""
    return `${sign}${currencyPrefix ? "R$ " : ""}${number(Math.abs(value))}`
}

const useInputInitialValue = (value: string) => {
    const input = ref<HTMLInputElement>()
    onMounted(() => {
        // @ts-expect-error property $el is not defined on types
        const inputEl = input.value?.$el.querySelector("input")
        inputEl.value = value
    })

    return input
}

export default {
    emits: ["input"],
    props: {
        value: { type: String, default: null },
        collection: { type: String, default: null },
        field: { type: String, default: null },
        primaryKey: { type: String, default: null },
        maskType: { type: String, default: "cpf" },
        customPattern: { type: String, default: null },
        validate: { type: Boolean, default: true },
    },
    setup(props, { emit }) {
        const input = useInputInitialValue(props.value)
        const errorMessage = ref<string>()
        const maskPattern = ref<AnyMaskedOptions>(
            {
                cpf: "000.000.000-00",
                cnpj: "00.000.000/0000-00",
                inscription_code: "0.0.0.0000",
                telephone: "(00) 00000-0000, (00) 0000-0000",
                currency: IMask.createMask({
                    mask: String,
                    commit: function (value, masked) {
                        masked._value = currencyFormatter(value)
                    },
                }),
                custom: props.customPattern,
            }[props.maskType]
        )
        const disabled = useInterfaceDisabled(
            props.primaryKey,
            props.collection,
            props.field
        )

        const mask = IMask.createMask<any>({
            mask:
                maskPattern.value instanceof IMask.Masked
                    ? maskPattern.value
                    : maskPattern.value
                          .toString()
                          .split(", ")
                          .map((mask) => ({ mask })),
        })

        const handleInput = (e: InputEvent) => {
            const inputEl = e.target as HTMLInputElement
            const rawValue = inputEl.value

            if (!rawValue) {
                emit("input", null)
            }

            const maskedValue = mask.resolve(rawValue)

            if (props.maskType === "currency") {
                emit("input", maskedValue)
            } else if (
                maskedValue.length === mask.currentMask?.mask.toString().length
            ) {
                try {
                    props.validate && validate(maskedValue)
                } catch (e) {
                    const { message } = e as Error
                    errorMessage.value = message
                    emit("input", null)
                    return
                }

                errorMessage.value = undefined
                emit("input", maskedValue)
            } else {
                emit("input", null)
            }

            inputEl.value = maskedValue
        }

        const validate = (value: string) => {
            switch (props.maskType) {
                case "cpf":
                    if (isCpf(value)) {
                        return
                    }
                    throw new Error("Insira um CPF válido.")
                case "cnpj":
                    if (isCnpj(value)) {
                        return
                    }
                    throw new Error("Insira um CNPJ válido.")
                case "telephone":
                    if (value.length >= 14) {
                        return
                    }
                    throw new Error("Insira um telefone válido.")
                case "inscription_code":
                    if (value.length >= 10) {
                        return
                    }
                    throw new Error("Insira um código válido.")
                case "currency":
                    return
                case "custom":
                // if (mask.compiledMasks[0].mask.toString().length)
                //     if (hasMultipleMasks.value) {
                //         const masks = maskPattern.value.split(", ")
                //         const lengths = masks.map((el) => el.length)

                //         if (!lengths.includes(value?.length)) {
                //             errorMessage.value = "Insira um valor válido"
                //             return false
                //         }
                //     } else {
                //         if (
                //             !valueToValidate ||
                //             valueToValidate.length <
                //                 maskPattern.value.length
                //         ) {
                //             errorMessage.value = "Insira um código válido."
                //             return false
                //         }
                //     }

                // return true
            }
        }

        return {
            input,
            disabled,
            handleInput,
            errorMessage,
        }
    },
}
</script>
<!-- 
<style scoped>
.masked-input {
    p {
        font-size: 14px;
        color: var(--orange);
        margin: 1px 1px;
    }
}
</style> -->
