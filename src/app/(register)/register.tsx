import { Button, Input } from "@components/form";
import Text from "@components/text";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import { UseUserRegisteringType, useUserRegistering } from "@store/useUserRegistering";
import { AuthError } from "@supabase/supabase-js";
import { router } from "expo-router";
import { CheckIcon, HStack, Select, VStack } from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { statesAndCities } from "../shared/mock/states-and-cities";
import { universities } from "../shared/mock/universities";
import { mountSchemeErrorMessage } from "../shared/utils/mount-scheme-error-message";
import { RegisterUserScheme, RegisterUserType } from "../shared/validators/schemes/register-scheme";

type FormErrorStateType = {
  path: string | number | undefined,
  message: string
}

type PageComponentType = {
  errors?: FormErrorStateType
} & UseUserRegisteringType

export default function Page() {
  const [step, setStep] = useState<number>(1)
  const [formError, setFormError] = useState<FormErrorStateType | null>()

  const [isCreatingAccountLoading, setIsCreatingAccountLoading] = useState(false)

  const useUser = useUserRegistering()

  async function handleSignUp() {
    try {
      setIsCreatingAccountLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: useUser.email,
        password: useUser.password
      })

      if (error) throw new Error(error.message)

      if (data) router.push('home')
    } catch (err: any | AuthError) {
      Toast.show({
        type: 'error',
        text1: err.message,
      })
    } finally {
      setIsCreatingAccountLoading(false)
    }
  }

  function handleStepForward() {
    try {
      handleVerifyInputs()
      if (step >= 4) handleSignUp()
      setStep((oldStep) => oldStep < 4 ? oldStep + 1 : 4)
    } catch (err: any) {
      const data: z.SafeParseError<RegisterUserType> = JSON.parse(err.message)
      const errors = data.error.issues.at(0)

      const errorMessage = mountSchemeErrorMessage<RegisterUserType>(err.message)

      setFormError({
        path: errors?.path.at(0),
        message: mountSchemeErrorMessage<RegisterUserType>(err.message)
      })

      Toast.show({
        type: 'error',
        text1: errorMessage,
      })
    }
  }
  function handleStepBack() {
    if (step > 1)
      setStep((oldStep) => oldStep - 1)
    else router.push('/')
  }

  function handleVerifyInputs() {
    console.log(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(useUser.email))
    const result = RegisterUserScheme.safeParse(useUser)

    if (!result.success)
      throw Error(JSON.stringify(result))
  }

  const Pages: any = {
    1: FormEmail,
    2: FormInstitution,
    3: FormLocale,
    4: FormPassword
  }
  const PageComponent = Pages[step]

  return (
    <VStack space='28' h='full' justifyContent='center' p={6}>
      <VStack space='2'>
        <Text fontSize='24' color='blue.600' textAlign='center' mb='10'>HelpStudies</Text>
        <HStack alignItems='center'>
          <Button backgroundColor='white' onPress={handleStepBack}>
            <AntDesign name="arrowleft" size={16} color='black' />
          </Button>
          <Text fontWeight='bold' fontSize='lg'>Etapa {step}/4</Text>
        </HStack>
        <Text>Nos diga seu nome e email</Text>
      </VStack>

      <VStack>
        <VStack space='2'>
          <PageComponent {...useUser as object} errors={formError} />
        </VStack>
      </VStack>

      <VStack w='full' alignItems='center' space='1'>
        <Button w='full' onPress={handleStepForward} isLoading={isCreatingAccountLoading}>proximo</Button>
      </VStack>
    </VStack>
  );
}

function FormEmail(props: PageComponentType) {
  return (
    <VStack space='2'>
      <Input
        placeholder="Digite seu nome"
        onChangeText={props.setName}
        value={props.name}
        error={props.errors?.path === 'nome' ? props.errors?.message : ''}
      />
      <Input
        placeholder="Digite seu email"
        onChangeText={props.setEmail}
        value={props.email}
        autoCapitalize='none'
        error={props.errors?.path === 'email' ? props.errors?.message : ''}
      />
    </VStack>
  )
}

function FormInstitution(props: PageComponentType) {
  console.log(props)
  return (
    <VStack space='2'>
      <Select
        placeholder="Instituição onde ensina"
        onValueChange={props.setInstitution}
        selectedValue={props.institution}
        minWidth="200"
        accessibilityLabel="Choose Service"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
      >
        {universities.map((i) => (
          <Select.Item label={`${i.NOME_DA_IES} - ${i.SIGLA}`} value={i.CODIGO_DA_IES} />
        ))}
      </Select>
      <Input
        placeholder="data de início"
        onChangeText={props.setStartDate}
        value={props.startDate}
        mask="99/99/9999"
        keyboardType="numeric"
      />
      <Input
        placeholder="Nivel de formação"
        onChangeText={props.setDegree}
        value={props.degree}
        mask="99/99/9999"
        keyboardType="numeric"
      />
    </VStack>
  )
}

function FormLocale(props: PageComponentType) {
  return (
    <VStack space='2'>
      <Select
        placeholder="Estado"
        onValueChange={props.setState}
        selectedValue={props.state}
        minWidth="200"
        accessibilityLabel="Choose Service"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
      >
        {statesAndCities.estados.map((s) => (
          <Select.Item label={`${s.nome} - ${s.sigla}`} value={s.sigla} />
        ))}
      </Select>
      <Select
        placeholder="Cidade"
        onValueChange={props.setCity}
        selectedValue={props.city}
        minWidth="200"
        accessibilityLabel="Choose Service"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        isDisabled={!props.state}
      >
        {statesAndCities.estados.find((e) => e.sigla === props.state)?.cidades.map((c) => (
          <Select.Item label={`${c}`} value={c} />
        ))}
      </Select>
    </VStack>
  )
}

function FormPassword(props: PageComponentType) {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <VStack space='2'>
      <Input
        placeholder="Digite sua senha"
        onChangeText={props.setPassword}
        value={props.password}
        autoCapitalize='none'
        secureTextEntry={!show}
        InputRightElement={(
          <Button onPress={() => setShow(old => !old)} bgColor='white'>
            <AntDesign name="eye" size={20} />
          </Button>
        )}
      />
      <Input
        placeholder="Confirme sua senha"
        onChangeText={props.setConfirmPassword}
        value={props.confirmPassword}
        autoCapitalize='none'
        secureTextEntry={!showConfirm}
        InputRightElement={(
          <Button onPress={() => setShowConfirm(old => !old)} bgColor='white'>
            <AntDesign name="eye" size={20} />
          </Button>
        )}
      />
    </VStack>
  )
}
