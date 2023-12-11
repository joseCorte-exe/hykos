import { Button, Input } from "@components/form";
import Text from "@components/text";
import { Link } from "@components/text/link";
import { supabase } from "@lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { router } from "expo-router";
import { VStack } from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignin({ email, password }: { email: string, password: string }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.log(error)

      if (error) throw new Error(error.message)

      if (data) router.push('home')
    } catch (err: any | AuthError) {
      Toast.show({
        type: 'error',
        text1: err.message,
      })
    }
  }

  return (
    <VStack space='28' h='full' justifyContent='center' p={6}>
      <VStack space='2'>
        <Text fontSize='20'>Bem vindo ao <Text fontSize='24' color='blue.600'>HelpStudies</Text>!</Text>
        <Text>Faça login ou registre-se para aproveitar do melhor ds metodos de ensino</Text>
      </VStack>

      <VStack>
        <VStack space='2'>
          <Input
            placeholder="Digite seu email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none'
          />
          <Input
            placeholder="Digite sua senha"
            onChangeText={setPassword}
            value={password}
            type='password'
            autoCapitalize='none'
            secureTextEntry
          />
        </VStack>
        <Link href='#'>Esqueceu sua senha?</Link>
      </VStack>

      <VStack w='full' alignItems='center' space='1'>
        <Button w='full' onPress={() => handleSignin({ email, password })}>Entrar</Button>
        <Text>Ou</Text>
        <Button w='full' onPress={() => router.push('register')}>Cadastre-se</Button>
      </VStack>
    </VStack>
  );
}
