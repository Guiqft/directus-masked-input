<template>
    <div class="masked-input">
        <v-input
            :id="`inputEl-${uid}`"
            :model-value="value"
            @update:model-value="handleInput"
            :disabled="disabled"
        />

        <p v-if="errorMessage">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, inject, getCurrentInstance, watch } from "vue"
import IMask, { AnyMaskedOptions } from "imask"
import { isCnpj, isCpf } from "validator-brazil"

export default {
    emits: ["input"],
    props: {
        value: { type: String, default: null },
        collection: { type: String, default: null },
        field: { type: String, default: null },
        primaryKey: { type: String, default: null },
        maskType: { type: String, default: null },
        maskPattern: { type: String, default: null },
    },
    setup(props, { emit }) {
        const { uid } = getCurrentInstance()
        const stores = inject("stores") as Record<string, any>

        const value = ref(props.value)
        const mask = ref(null)
        const hasMultipleMasks = ref(false)

        const errorMessage = ref("")
        const disabled = ref(false)

        onMounted(() => {
            // If aren't creating a new item
            if (props.primaryKey !== "+") {
                // Get field edit config to disable the input
                const currentField = stores
                    .useFieldsStore()
                    .getField(props.collection, props.field)
                disabled.value = currentField?.meta.readonly || disabled.value
            }

            if (props.maskPattern.includes(", ")) {
                hasMultipleMasks.value = true
            } else {
                hasMultipleMasks.value = false
            }
        })

        const handleInput = (valueToMask?: string) => {
            const inputEl = document.getElementById(
                `inputEl-${uid}`
            ) as HTMLInputElement

            if (valueToMask) {
                const maskOptions: AnyMaskedOptions = hasMultipleMasks.value
                    ? {
                          mask: props.maskPattern.split(", ").map((mask) => ({
                              mask,
                          })),
                      }
                    : {
                          mask: props.maskPattern,
                      }

                if (!mask.value) mask.value = IMask(inputEl, maskOptions)

                if (validate(valueToMask)) {
                    errorMessage.value = null
                    emit("input", valueToMask)
                } else {
                    emit("input", null)
                    mask.value.typedValue = inputEl.value
                }
            } else {
                emit("input", null)
                value.value = inputEl.value
                mask.value.typedValue = inputEl.value
            }
        }

        const validate = (valueToValidate?: string) => {
            switch (props.maskType) {
                case "cpf":
                    if (!isCpf(valueToValidate || "")) {
                        errorMessage.value = "Insira um valor válido."
                        return false
                    }

                    return true

                case "cnpj":
                    if (!isCnpj(valueToValidate || "")) {
                        errorMessage.value = "Insira um valor válido."
                        return false
                    }
                    return true
                case "telephone":
                    if (!valueToValidate || valueToValidate.length < 14) {
                        errorMessage.value = "Insira um telefone válido."
                        return false
                    }

                    return true
                case "inscription_code":
                    if (!valueToValidate || valueToValidate.length < 10) {
                        errorMessage.value = "Insira um código válido."
                        return false
                    }

                    return true
                case "custom":
                    if (hasMultipleMasks.value) {
                        const masks = props.maskPattern.split(", ")
                        const lengths = masks.map((el) => el.length)

                        if (!lengths.includes(valueToValidate?.length)) {
                            errorMessage.value = "Insira um valor válido"
                            return false
                        }
                    } else {
                        if (
                            !valueToValidate ||
                            valueToValidate.length < props.maskPattern.length
                        ) {
                            errorMessage.value = "Insira um código válido."
                            return false
                        }
                    }

                    return true
            }
        }

        return {
            value,
            uid,
            mask,
            handleInput,
            hasMultipleMasks,
            errorMessage,
            disabled,
        }
    },
}
</script>

<style lang="scss" scoped>
.masked-input {
    p {
        font-size: 14px;
        color: var(--orange);
        margin: 1px 1px;
    }
}
</style>
