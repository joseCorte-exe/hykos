import { Card } from '@components/card';
import { Input } from '@components/form';
import Text from "@components/text";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@lib/supabase';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Box, Center, FlatList, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

function Page({ skills, onRefresh }: { skills: Array<any>, onRefresh: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState<number | string>()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleNavigate(title: string, id: number | string) {
    setCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.push({ pathname: `strategies/info/${title}`, params: { skillId: String(id) } })
      setIsLoading(false)
    }, 500)
  }

  function handleRefresh() {
    setIsRefreshing(true)
    onRefresh()
    setIsRefreshing(false)
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} enabled={true} onRefresh={handleRefresh} />}>
      <VStack padding='6' space='8' >
        <VStack>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>Estratégias</Text>
          <Text color='gray.600'>Aqui você pode achar as estratégias que deseja</Text>
        </VStack>

        <Input placeholder='Pesquisar' />

        <VStack>
          <FlatList
            data={skills}
            ItemSeparatorComponent={() => <Box height='4' />}
            renderItem={({ item }: any) => (
              <Card.Root>
                <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                <Text fontSize='md' textAlign='center'>{item.title}</Text>
                <Card.Button onPress={() => handleNavigate(item.title, item.id)} isLoading={cardId === item.id && isLoading} disabled={isLoading}>
                  <Text color='white'>Ver Mais</Text>
                  <AntDesign name="arrowright" size={16} color='white' />
                </Card.Button>
              </Card.Root>
            )}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}

export default function Home() {
  const [isFetching, setIsFetching] = useState(false)
  const params = useLocalSearchParams()

  const [skills, setSkills] = useState([])

  async function handleGetStrategies() {
    setIsFetching(true)
    try {
      const { data: relationData, error: relationError } = await supabase
        .from('strategies_skills')
        .select('*')
        .eq('strategy_id', params.strategyId)

      const skillsIds = relationData?.map((skill) => skill.skill_id) ?? []

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .in('id', skillsIds)

      setSkills(data as [])
      if (error) throw new Error(JSON.stringify({ ...error }) || '')
    } catch (err) {
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    handleGetStrategies()
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.strategy)}</Text>
        }}
      />
      {
        !isFetching
          ? (<Page skills={skills} onRefresh={handleGetStrategies} />)
          : (
            <Center h='full'>
              <ActivityIndicator color='#1E3A8A' />
            </Center>
          )
      }

    </>
  )
}
