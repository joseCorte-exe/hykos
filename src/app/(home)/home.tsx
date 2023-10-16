import { Card } from '@components/card';
import { Input } from '@components/form';
import Text from "@components/text";
import { AntDesign } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Box, FlatList, HStack, ScrollView, VStack } from 'native-base';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState<number | string>()

  async function handleNavigate(title: string, id: number | string) {
    setCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.setParams({
        topicId: String(id)
      })
      router.push('strategies/lembrar')
      setIsLoading(false)
    }, 500)
  }


  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='lg'>Competências</Text>
        }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} enabled={true} onRefresh={() => console.log('refreshing')} />}>
        <VStack padding='6' space='8' >
          <VStack>
            <Text color='blue.600' fontSize='16' fontWeight='medium'>Competências</Text>
            <Text color='gray.600'>Aqui você pode achar as competências que deseja</Text>
          </VStack>

          <Input placeholder='Pesquisar' />

          <VStack>
            <HStack space='md'>
              <FlatList
                data={Array(10).fill(1)}
                ItemSeparatorComponent={() => <Box height='4' />}
                renderItem={({ index }) => (
                  <Card.Root>
                    <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                    <Text fontSize='md'>Lembrar</Text>
                    <Card.Button onPress={() => handleNavigate('estrategia info: lembrar', index)} isLoading={cardId === index && isLoading} disabled={isLoading}>
                      <Text color='white'>Ver Mais</Text>
                      <AntDesign name="arrowright" size={16} color='white' />
                    </Card.Button>
                  </Card.Root>
                )}
              />
              <FlatList
                data={Array(10).fill(1)}
                ItemSeparatorComponent={() => <Box height='4' />}
                renderItem={({ index }) => (
                  <Card.Root>
                    <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                    <Text fontSize='md'>Lembrar</Text>
                    <Card.Button onPress={() => handleNavigate('estrategia info: lembrar', (index * 150))} isLoading={cardId === (index * 150) && isLoading} disabled={isLoading}>
                      <Text color='white'>Ver Mais</Text>
                      <AntDesign name="arrowright" size={16} color='white' />
                    </Card.Button>
                  </Card.Root>
                )}
              />
            </HStack>
          </VStack>
        </VStack>
      </ScrollView >
    </>
  )
}