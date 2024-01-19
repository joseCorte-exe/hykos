import Text from "@components/text";
import { UseUserRegisteringType } from "@store/useUserRegistering";
import { HStack, VStack } from "native-base";

type FormErrorStateType = {
  path: string | number | undefined,
  message: string
}

type PageComponentType = {
  errors?: FormErrorStateType
} & UseUserRegisteringType

export default function Page() {
  return (
    <VStack space='28' h='full' justifyContent='center' p={6}>
      <VStack space='2'>
        <Text fontSize='24' color='blue.600' textAlign='center' mb='10'>HelpStudies</Text>
        <HStack alignItems='center'>
        </HStack>
        <Text>Créditos</Text>
      </VStack>

      <VStack>
        <VStack space='2'>
          <Text>
            {`
              Equipe de Desenvolvimento 

              Autores

              Luiza Helena Rodrigues Arantes
              - Mestranda no Programa de Pós-graduação em Educação - Mestrado Profissional em Educação.

              José Corte
              - Aluno do curso de Ciências da Computação, contribuição no desenvolvimento do aplicativo.

              Marnes Adão Simão Cassule
              - Coordenador do Curso de Ciências da Computação

              Silvia Quadros
              - Coordenador do Mestrado Profissional em Educação
              - Orientadora e mentora do projeto.


              Agradecimentos Especiais

              Conselho Nacional de Desenvolvimento Científico e Tecnológico – CNPQ
              Mestrado Profissional em Educação do Centro Universitário Adventista de São Paulo - UNASP


              Créditos de Conteúdo

              Autores

              Gildene do Ouro Lopes Silva e Betania Jacob Stange Lopes
              Livro: Estratégias de Ensino
              Ano: 2013
              Editora: Unaspress, Engenheiro Coelho, SP

              Juan Díaz Bordenave
              Ano: 2015
              Livro: Estratégias de Ensino-Aprendizagem
              Editora: Vozes

              Benjamin Samuel Bloom, Thomas Hastings e George Madaus
              Ano: 1971
              Livro: Manual de Avaliação Formativa e Somativa do Aprendizado do aluno
            `}
          </Text>
        </VStack>
      </VStack>

      <VStack w='full' alignItems='center' space='1'>
      </VStack>
    </VStack>
  );
}
