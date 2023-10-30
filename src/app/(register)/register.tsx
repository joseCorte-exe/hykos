import { Button, Input } from "@components/form";
import Text from "@components/text";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import { useUserRegistering } from "@store/useUserRegistering";
import { HStack, VStack } from "native-base";
import { useState } from "react";

export default function Page() {

  const [step, setStep] = useState<number>(1)

  const useUser = useUserRegistering()

  async function handleSignUp({ email, password }: { email: string, password: string }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw new Error(JSON.stringify({ ...error }) || '')
    } catch (err) {
      console.error(err)
    }
  }

  const Pages: any = {
    1: FormEmail,
    2: FormInstitution
  }
  const PageComponent = Pages[step]

  return (
    <VStack space='28' h='full' justifyContent='center' p={6}>
      <VStack space='2'>
        <Text fontSize='24' color='blue.600' textAlign='center' mb='10'>HelpStudies</Text>
        <HStack alignItems='center'>
          <Button backgroundColor='white' onPress={() => setStep((oldStep) => oldStep > 1 ? oldStep - 1 : 1)}>
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
        <Button w='full' onPress={() => setStep((oldStep) => oldStep < 4 ? oldStep + 1 : 4)}>proximo</Button>
      </VStack>
    </VStack>
  );
}

function FormEmail(props: any) {
  return (
    <VStack space='2'>
      <Input
        placeholder="Digite seu email"
        onChangeText={props.setEmail}
        value={props.email}
        autoCapitalize='none'
      />
      <Input
        placeholder="Digite seu nome"
        onChangeText={props.setPassword}
        value={props.password}
        type='password'
        autoCapitalize='none'
        secureTextEntry
      />
    </VStack>
  )
}

function FormInstitution(props: any) {
  return (
    <VStack space='2'>
      <Input
        placeholder="Instituição onde ensina"
        onChangeText={props.setEmail}
        value={props.email}
      />
      <Input
        placeholder="data de início"
        onChangeText={props.setPassword}
        value={props.password}
        autoCapitalize='none'
      />
    </VStack>
  )
}