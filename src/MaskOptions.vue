<template>
    <div class="mask-option">
        <v-form
            :fields="formFields"
            :model-value="value"
            @update:model-value="handleInput"
        />

        <div class="mask-input" v-if="showMaskInput">
            <div class="type-label">Mascara</div>

            <v-input
                :model-value="value.maskPattern"
                @update:model-value="setMask"
                placeholder="Insira a máscara do valor"
            />
            <p>
                Múltiplas máscaras devem ser separadas por vírgula e espaço.
                <br />Ex: (##) ####-####, (##) #####-#### <br />Mais informações
                em:
                <a href="https://vuejs-tips.github.io/vue-the-mask/"
                    >vue-the-mask</a
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, PropType, onMounted } from "vue"

interface MaskConfig {
    maskType: "cpf" | "cnpj" | "inscription_code" | "telephone" | "custom"
    maskPattern: string
}

export default {
    emits: ["input"],
    props: {
        value: {
            type: Object as PropType<MaskConfig>,
            default: { maskType: null, maskPattern: null },
        },
    },
    setup(props, { emit }) {
        const showMaskInput = ref(false)

        onMounted(() => {
            if (props.value && props.value?.maskPattern)
                showMaskInput.value = true
        })

        const handleInput = (editData: MaskConfig) => {
            if (editData.maskType === "custom" && !props.value?.maskPattern) {
                showMaskInput.value = true
                emit("input", editData)
            } else {
                showMaskInput.value = false
                delete props.value?.maskPattern
                emit("input", {
                    ...editData,
                    maskPattern: null,
                })
            }
        }

        const setMask = (mask: string) => {
            if (mask.length > 0) {
                emit("input", {
                    ...props.value,
                    maskPattern: mask,
                })
            } else {
                emit("input", {
                    ...props.value,
                    maskPattern: null,
                })
            }
        }

        const formFields = [
            {
                field: "maskType",
                name: "Tipo de Máscara",
                type: "string",
                meta: {
                    interface: "select-dropdown",
                    options: {
                        placeholder: "Selecione uma máscara predefinida",
                        choices: [
                            { text: "CPF", value: "cpf" },
                            { text: "CNPJ", value: "cnpj" },
                            {
                                text: "Código de Inscrição",
                                value: "inscription_code",
                            },
                            { text: "Telefone", value: "telephone" },
                            { text: "Customizada...", value: "custom" },
                        ],
                    },
                },
            },
        ]

        return { showMaskInput, handleInput, setMask, formFields }
    },
}
</script>

<style lang="scss" scoped>
.mask-option {
    .mask-input {
        .type-label {
            margin-top: 20px;
            margin-bottom: 5px;
        }
        p {
            font-size: 13.5px;
            color: var(--foreground-subdued);
            margin: 4px;

            a {
                font-weight: bold;
            }
        }
    }
}
</style>
