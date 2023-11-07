import { Button, Input } from "@components/form";
import Text from "@components/text";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import { UseUserRegisteringType, useUserRegistering } from "@store/useUserRegistering";
import { AuthError } from "@supabase/supabase-js";
import { router } from "expo-router";
import { HStack, VStack } from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Page() {

  const [step, setStep] = useState<number>(1)

  const useUser = useUserRegistering()

  async function handleSignUp() {
    try {
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
    }
  }

  function handleStepForward() {
    if (step >= 4) handleSignUp()
    setStep((oldStep) => oldStep < 4 ? oldStep + 1 : 4)
  }
  function handleStepBack() {
    if (step > 1)
      setStep((oldStep) => oldStep - 1)
    else router.push('/')
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
          <PageComponent {...useUser as object} />
        </VStack>
      </VStack>

      <VStack w='full' alignItems='center' space='1'>
        <Button w='full' onPress={handleStepForward}>proximo</Button>
      </VStack>
    </VStack>
  );
}

function FormEmail(props: UseUserRegisteringType) {
  return (
    <VStack space='2'>
      <Input
        placeholder="Digite seu nome"
        onChangeText={props.setName}
        value={props.name}
      />
      <Input
        placeholder="Digite seu email"
        onChangeText={props.setEmail}
        value={props.email}
        autoCapitalize='none'
      />
    </VStack>
  )
}

function FormInstitution(props: UseUserRegisteringType) {
  console.log(props)
  return (
    <VStack space='2'>
      <Input
        placeholder="Instituição onde ensina"
        onChangeText={props.setInstitution}
        value={props.institution}
      />
      <Input
        placeholder="data de início"
        onChangeText={props.setStartDate}
        value={props.startDate}
      />
      <Input
        placeholder="Nivel de formação"
        onChangeText={props.setDegree}
        value={props.degree}
      />
    </VStack>
  )
}

function FormLocale(props: UseUserRegisteringType) {
  return (
    <VStack space='2'>
      <Input
        placeholder="Estado"
        onChangeText={props.setState}
        value={props.state}
      />
      <Input
        placeholder="Cidade"
        onChangeText={props.setCity}
        value={props.city}
        autoCapitalize='none'
      />
    </VStack>
  )
}

function FormPassword(props: UseUserRegisteringType) {
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