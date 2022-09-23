import MaskedInput from "./MaskedInput.vue"
// import PreviewSVG from "./preview.svg?raw"

export default {
    id: "masked-input",
    name: "Entrada com Máscara",
    description:
        "Interface para um texto mascarado com predefinições para: CPF, CNPJ, Código de Inscriçao e Telefone",
    icon: "box",
    types: ["string"],
    group: "standard",
    // preview: PreviewSVG,
    component: MaskedInput,
    options: [
        {
            field: "maskType",
            name: "Tipo de Máscara",
            type: "string",
            schema: {
                default_value: "cpf",
            },
            meta: {
                required: true,
                width: "full",
                interface: "select-dropdown",
                options: {
                    choices: [
                        { text: "CPF", value: "cpf" },
                        { text: "CNPJ", value: "cnpj" },
                        {
                            text: "Código de Inscrição",
                            value: "inscription_code",
                        },
                        { text: "Telefone", value: "telephone" },
                        { text: "Dinheiro", value: "currency" },
                        { text: "Customizada", value: "custom" },
                    ],
                },
            },
        },
        {
            field: "validate",
            type: "boolean",
            name: "Validar Input",
            meta: {
                width: "half",
                interface: "boolean",
                conditions: [
                    {
                        rule: {
                            maskType: {
                                _eq: "currency",
                            },
                        },
                        hidden: true,
                    },
                ],
            },
            schema: {
                default_value: true,
            },
        },
        {
            field: "customPattern",
            type: "string",
            name: "Padrão customizado",
            meta: {
                interface: "input",
                width: "half",
                note: 'Múltiplas máscaras devem ser separadas por vírgula e espaço. <br />\
                    Ex: (00) 0000-0000, (00) 00000-0000 <br />\
                    Mais informações em: <a href="https://imask.js.org/guide.html#masked-pattern">iMask Pattern</a>',
                options: {
                    placeholder: "Sua máscara customizada",
                },
                hidden: true,
                conditions: [
                    {
                        rule: {
                            maskType: {
                                _eq: "custom",
                            },
                        },
                        hidden: false,
                        required: true,
                    },
                ],
            },
        },
    ],
}
