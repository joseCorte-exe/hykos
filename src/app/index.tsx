import { Button, Input } from "@components/form";
import Text from "@components/text";
import { Link } from "@components/text/link";
import { router } from "expo-router";
import { VStack } from "native-base";

export default function Page() {
  return (
    <VStack space='28' h='full' justifyContent='center'>
      <VStack space='2'>
        <Text fontSize='20'>Bem vindo ao <Text fontSize='24' color='blue.600'>HelpStudies</Text>!</Text>
        <Text>Faça login ou registre-se para aproveitar do melhor ds metodos de ensino</Text>
      </VStack>

      <VStack>
        <VStack space='2'>
          <Input placeholder="Digite seu email" />
          <Input placeholder="Digite sua senha" />
        </VStack>
        <Link href='#'>Esqueceu sua senha?</Link>
      </VStack>

      <VStack w='full' alignItems='center' space='1'>
        <Button w='full' onPress={() => router.push('home')}>Entrar</Button>
        <Text>Ou</Text>
        <Button w='full'>Cadastre-se</Button>
      </VStack>
    </VStack>
  );
}
