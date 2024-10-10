export const useServiceOrderStore = defineStore("service_order", () => {
  const situation = ref<{ SITUACAOOS: number; DESCRSITUACAOOS: string }[]>([])

  const service_mode = ref<string | null>(null)

  const type = ref<string | null>(null)

  const status = ref<string | null>(null)

  const os_supplier = ref<string>('')

  const validateStepOne = computed(() => service_mode.value !== null && type.value !== null && status.value !== null)

  interface ClientData {
    name: string;
    gender: string | null;
    type: boolean | null;
    cpf_cnpj?: string;
    identity_number?: string;
    born_date?: string | null;
    email?: string;
    number1: string;
    identifier_number1?: string;
    number2?: string;
    identifier_number2?: string;
    number3?: string;
    identifier_number3?: string;
  }

  const clientData = ref<ClientData>({
    name: '',
    gender: null,
    type: null,
    cpf_cnpj: '',
    identity_number: '',
    born_date: null,
    email: '',
    number1: '',
    identifier_number1: '',
    number2: '',
    identifier_number2: '',
    number3: '',
    identifier_number3: '',
  })

  const errorsClientData = ref({})

  interface AddressData {
    zipcode: string;
    street: string;
    neighbourhood: string;
    city: string;
    state: string;
    complement?: string;
    number?: string;
    observation?: string;
    type?: string;
    country?: string;
  }

  const addressData = ref<AddressData>({
    zipcode: '',
    street: '',
    neighbourhood: '',
    city: '',
    state: '',
    complement: '',
    number: '',
    observation: '',
  })

  const errorsAddressData = ref({})

  const validateStepTwo = computed(() => {
    const newData = { ...clientData.value, ...addressData.value }

    delete newData.cpf_cnpj
    delete newData.identity_number
    delete newData.born_date
    delete newData.email
    delete newData.identifier_number1
    delete newData.number2
    delete newData.identifier_number2
    delete newData.number3
    delete newData.identifier_number3
    delete newData.number
    delete newData.complement
    delete newData.observation

    return Object.values(newData).every((e) => {
      return e !== null && e !== ''
    })
  })

  return {
    situation,
    service_mode,
    type,
    status,
    os_supplier,
    validateStepOne,
    clientData,
    validateStepTwo,
    errorsClientData,
    addressData,
    errorsAddressData
  }
})
