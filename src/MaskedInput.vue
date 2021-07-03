<template>
    <div class="masked-input">
        <v-input
            v-model="value"
            v-mask="hasMultipleMasks ? mask.split(', ') : mask"
            :disabled="disabled"
        />

        <p v-if="errorMessage">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script lang="ts">
import { ref, Directive, onMounted, inject, computed } from "vue"
import { mask } from "vue-the-mask"
import { isCnpj, isCpf } from "validator-brazil"

export default {
    emits: ["input"],
    directives: { mask: mask as Directive },
    props: {
        value: { type: String, default: null },
        collection: { type: String, default: null },
        field: { type: String, default: null },
        primaryKey: { type: String, default: null },
        maskPattern: { type: String, default: null },
        maskType: { type: String, default: null },
    },
    setup(props, { emit }) {
        const system = inject("system") as any
        const mask = ref("")
        const hasMultipleMasks = ref(false)
        const errorMessage = ref("")
        const disabled = ref(false)

        const value = computed({
            get() {
                return props.value || ""
            },
            set(value: string) {
                // here we put the handleInput() code
                switch (props.maskType) {
                    case "cpf_cnpj":
                        if (!isCnpj(value || "") && !isCpf(value || "")) {
                            errorMessage.value = "Insira um valor válido."
                            emit("input", null)
                        } else {
                            emitInput(value)
                        }
                        break
                    case "telephone":
                        if (!value || value.length < 14) {
                            errorMessage.value = "Insira um telefone válido."
                            emit("input", null)
                        } else {
                            emitInput(value)
                        }
                        break
                    case "inscription_code":
                        if (value.length < 10) {
                            errorMessage.value = "Insira um código válido."
                            emit("input", null)
                        } else {
                            emitInput(value)
                        }
                        break
                    case "custom":
                        if (hasMultipleMasks.value) {
                            const masks = mask.value.split(", ")
                            const lengths = masks.map((el) => el.length)

                            if (!lengths.includes(value?.length)) {
                                errorMessage.value = "Insira um valor válido"
                                emit("input", null)
                            } else {
                                emitInput(value)
                            }
                        } else {
                            if (!value || value.length < mask.value.length) {
                                errorMessage.value = "Insira um código válido."
                                emit("input", null)
                            } else {
                                emitInput(value)
                            }
                        }
                }
            },
        })

        onMounted(() => {
            // If aren't creating a new item
            if (props.primaryKey !== "+") {
                // Get field edit config to disable the input
                const currentField = system
                    .useFieldsStore()
                    .getField(props.collection, props.field)
                disabled.value = currentField?.meta.readonly || disabled.value
            }

            // changing mask if given maskType
            switch (props.maskType) {
                case "cpf_cnpj":
                    mask.value = "###.###.###-##, ##.###.###/####-##"
                    if (mask.value.includes(", ")) hasMultipleMasks.value = true
                    break
                case "telephone":
                    mask.value = "(##) ####-####, (##) #####-####"
                    break
                case "inscription_code":
                    mask.value = "#.#.#.####"
                    break
                case "custom":
                    if (props.maskPattern.includes(", "))
                        hasMultipleMasks.value = true
                    mask.value = props.maskPattern
                    break
            }
        })

        const emitInput = (value: string) => {
            errorMessage.value = null
            emit("input", value)
        }

        return {
            value,
            mask,
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
