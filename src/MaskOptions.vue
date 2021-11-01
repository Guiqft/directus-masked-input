<template>
    <div class="mask-option">
        <v-form
            :initialValues="initialValues"
            :fields="formFields"
            :model-value="value"
            @update:model-value="handleInput"
        />

        <div class="mask-input" v-if="showCustomMask">
            <div class="type-label">Mascara</div>

            <v-input
                :model-value="value.maskPattern"
                @update:model-value="setCustomMask"
                placeholder="Insira a máscara do valor"
            />
            <p>
                Múltiplas máscaras devem ser separadas por vírgula e espaço.
                <br />Ex: (00) 0000-0000, (00) 00000-0000 <br />Mais informações
                em:
                <a href="https://imask.js.org/guide.html#masked-pattern"
                    >iMask Pattern</a
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, PropType, onMounted, inject } from "vue"

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
        collection: {
            type: String,
            default: null,
        },
        field: {
            type: String,
            default: null,
        },
    },
    setup(props, { emit }) {
        const initialValues = ref({ maskType: null, maskPattern: null })
        const showCustomMask = ref(false)
        const { useFieldsStore } = inject("stores")

        const maskPatterns = {
            cpf: "000.000.000-00",
            cnpj: "00.000.000/0000-00",
            inscription_code: "0.0.0.0000",
            telephone: "(00) 00000-0000, (00) 0000-0000",
            custom: undefined,
        } as Record<MaskConfig["maskType"], string | undefined>

        const formFields = [
            {
                field: "maskType",
                name: "Tipo de Máscara",
                type: "string",
                meta: {
                    interface: "select-dropdown",
                    options: {
                        placeholder: showCustomMask.value
                            ? "Insira o padrão da máscara customizada"
                            : "Selecione uma máscara predefinida",
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
                    required: true,
                },
            },
        ]

        onMounted(() => {
            if (props.value?.maskType === "custom") showCustomMask.value = true

            if (props.value.maskPattern) {
                initialValues.value = props.value
            }
        })

        const handleInput = async (editData: MaskConfig) => {
            if (editData.maskType === "custom") {
                showCustomMask.value = true
                await emitMask({
                    maskType: "custom",
                    maskPattern: null,
                })
            } else {
                showCustomMask.value = false
                await emitMask(editData)
            }
        }

        const emitMask = async (mask: MaskConfig) => {
            await useFieldsStore().updateField(props.collection, props.field, {
                meta: {
                    options: {
                        maskType: mask.maskType,
                        maskPattern: mask.maskPattern,
                    },
                },
            })

            if (mask.maskType === "custom") {
                if (mask.maskPattern) {
                    emit("input", {
                        maskType: mask.maskType,
                        maskPattern: mask.maskPattern,
                    })
                } else {
                    emit("input", {
                        maskType: null,
                        maskPattern: null,
                    })
                }
            } else {
                emit("input", {
                    maskType: mask.maskType,
                    maskPattern: maskPatterns[mask.maskType],
                })
            }
        }

        const setCustomMask = (mask: string) => {
            emitMask({
                maskType: "custom",
                maskPattern: mask,
            })
        }

        return {
            initialValues,
            showCustomMask,
            handleInput,
            setCustomMask,
            formFields,
        }
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
