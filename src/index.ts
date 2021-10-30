import MaskedInput from "./MaskedInput.vue"
import MaskOptions from "./MaskOptions.vue"
import PreviewSVG from "./preview.svg"

export default {
    id: "masked-input",
    name: "Entrada com Máscara",
    description:
        "Interface para um texto mascarado com predefinições para: CPNF/CNPJ, Código de Inscriçao e Telefone",
    types: ["string"],
    component: MaskedInput,
    options: MaskOptions,
    group: "standard",
    preview: PreviewSVG,
}
