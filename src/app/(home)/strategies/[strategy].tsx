import { Card } from '@components/card';
import { Input } from '@components/form';
import Text from "@components/text";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@lib/supabase';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import debounce from 'lodash.debounce';
import { Box, Center, FlatList, Image, ScrollView, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

type PageType = {
  skills: Array<any>
  onRefresh: () => void
  description: string
  title: string
}

function Page({ skills: skillsProp, onRefresh, description, title }: PageType) {
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState<number | string>()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [skills, setSkills] = useState(skillsProp)

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

  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);
  async function handleSearch(search: string) {
    if (!!search.length) {
      const find = skills.find((s) => (s.title as string).includes(search))
      if (find)
        setSkills([find])
      else
        setSkills([])
    }
    else
      setSkills(skillsProp)
  }

  useEffect(() => {
    console.log(skills)
  }, [skills])

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} enabled={true} onRefresh={handleRefresh} />}>
      <Box w='full' h='64'>
        <Image source={{ uri: 'https://pelotasturismo.com.br/img/full/wcaRXTHVsiBx5qm2xAmoh33vgkTZG9nzQdpxBCCW.jpg' }} resizeMode="cover" size='full' />
      </Box>
      <VStack padding='6' space='8' size='full'>

        <VStack space='2' w='full'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>{title}</Text>
          <Text color='gray.600'>{description}</Text>
        </VStack>

        <VStack>
          <VStack mb='4'>
            <Text color='blue.600' fontSize='16' fontWeight='medium'>Estratégias</Text>
            <Text color='gray.600'>Aqui você pode achar as estratégias da competência</Text>
          </VStack>
          <Input placeholder='Pesquisar' onChangeText={debouncedSearch} mb='4' />

          {
            skills.length >= 1 ?
              <FlatList
                data={skills}
                ItemSeparatorComponent={() => <Box height='4' />}
                renderItem={({ item }: any) => (
                  <Card.Root>
                    <Card.Image src="https://cdn-icons-png.flaticon.com/512/2847/2847502.png" />
                    <Text fontSize='md' textAlign='center'>{item?.title}</Text>
                    <Card.Button onPress={() => handleNavigate(item?.title, item?.id)} isLoading={cardId === item?.id && isLoading} disabled={isLoading}>
                      <Text color='white'>Ver Mais</Text>
                      <AntDesign name="arrowright" size={16} color='white' />
                    </Card.Button>
                  </Card.Root>
                )}
              />
              : <></>
          }
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
        .from('skills_strategies')
        .select('*')
        .eq('strategy_id', params.strategyId)

      const skillsIds = relationData?.map((skill) => skill.skill_id) ?? []

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .in('id', skillsIds)

      setSkills(data as [])
      if (error || relationError) throw new Error(JSON.stringify({ ...error ?? relationError }) || '')
    } catch (err) {
      console.error(err)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    handleGetStrategies()
  }, [])

  console.log('params', params)

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.strategy)}</Text>
        }}
      />
      {
        !isFetching
          ? (<Page skills={skills} onRefresh={handleGetStrategies} description={params.description as string} title={params.strategy as string} />)
          : (
            <Center h='full'>
              <ActivityIndicator color='#1E3A8A' />
            </Center>
          )
      }
    </>
  )
}
