import { Card } from '@components/card';
import { Input } from '@components/form';
import Text from "@components/text";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@lib/supabase';
import { Stack, router } from 'expo-router';
import debounce from 'lodash.debounce';
import { Box, FlatList, HStack, ScrollView, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import Toast from "react-native-toast-message";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState<number | string>()
  const [strategies, setStrategies] = useState([])

  async function handleGetStrategies() {
    try {
      const { data, error } = await supabase
        .from('strategies')
        .select('*')

      setStrategies(data as [])

      if (error) throw Error(error?.message)
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err.message,
      })
    }
  }

  async function handleNavigate(title: string, id: number | string) {
    setCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.push({ pathname: `strategies/${title}`, params: { strategyId: id } })
      setIsLoading(false)
    }, 100)
  }

  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [strategies]);
  async function handleSearch(search: string) {
    try {
      let data
      if (search.length)
        data = await supabase
          .from('strategies')
          .select()
          .textSearch('title', `'${search}'`)
      else
        data = await supabase
          .from('strategies')
          .select('*')

      console.log(data)

      setStrategies(data.data as [])

      if (data.error) throw Error(data.error?.message)
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err,
      })
    }
    console.log(search)
  }

  useEffect(() => {
    handleGetStrategies()
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='lg'>Competências</Text>
        }}
      />
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={false}
          enabled={true}
          onRefresh={() => console.log('refreshing')}
        />
      }>
        <VStack padding='6' space='8' >
          <VStack>
            <Text color='blue.600' fontSize='16' fontWeight='medium'>Competências</Text>
            <Text color='gray.600'>Aqui você pode achar as competências que deseja</Text>
          </VStack>

          <Input
            placeholder='Pesquisar'
            onChangeText={debouncedSearch}
          />

          <VStack>
            <HStack space='md'>
              <FlatList
                data={strategies.slice(0, strategies.length / 2)}
                ItemSeparatorComponent={() => <Box height='4' />}
                renderItem={({ item }: any) => (
                  <Card.Root>
                    <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                    <Text fontSize='md' textAlign='center'>{item.title}</Text>
                    <Card.Button
                      onPress={() => handleNavigate(item.title, item.id)}
                      isLoading={cardId === item.id && isLoading}
                      disabled={isLoading}
                    >
                      <Text color='white'>Ver Mais</Text>
                      <AntDesign name="arrowright" size={16} color='white' />
                    </Card.Button>
                  </Card.Root>
                )}
              />
              <FlatList
                data={strategies.slice(strategies.length / 2)}
                ItemSeparatorComponent={() => <Box height='4' />}
                renderItem={({ item }: any) => (
                  <Card.Root>
                    <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                    <Text fontSize='md' textAlign='center'>{item.title}</Text>
                    <Card.Button
                      onPress={() => handleNavigate(item.title, item.id)}
                      isLoading={cardId === item.id && isLoading}
                      disabled={isLoading}
                    >
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
