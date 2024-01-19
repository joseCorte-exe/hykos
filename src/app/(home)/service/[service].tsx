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
import { ServiceEnum } from '../home';

type PageType = {
  skills: Array<any>
  onRefresh: () => void
  description: string
  title: string,
  service: string,
  image: string
}

function Page({ skills: skillsProp, onRefresh, description, title, service, image }: PageType) {
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState<number | string>()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [skills, setSkills] = useState(skillsProp)

  async function handleNavigate(title: string, id: number | string) {
    setCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.push({ pathname: `service/info/${title}`, params: { serviceId: String(id), service, title } })
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

  const serviceName = service === ServiceEnum.SKILLS ? ServiceEnum.STRATEGY : ServiceEnum.SKILLS
  const cardImage = service !== 'Competências' ? "https://cdn-icons-png.flaticon.com/512/2847/2847502.png" : 'https://cdn-icons-png.flaticon.com/512/609/609050.png'

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} enabled={true} onRefresh={handleRefresh} />}>
      <Box w='full' h='64'>
        <Image alt='banner' source={{ uri: image }} resizeMode="cover" size='full' />
      </Box>
      <VStack padding='6' space='8' size='full'>

        <VStack space='2' w='full'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>{title}</Text>
          <Text color='gray.600'>{description}</Text>
        </VStack>

        <VStack>
          <VStack mb='4'>
            <Text color='blue.600' fontSize='16' fontWeight='medium'>{serviceName}</Text>
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
                    <Card.Image src={cardImage} />
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

  console.log(params)

  const [skills, setSkills] = useState([])

  async function handleGetStrategies() {
    setIsFetching(true)
    try {
      const relationalTableRequiredColumn = params.service === ServiceEnum.SKILLS ? 'skill_id' : 'strategy_id'
      const { data: relationData, error: relationError } = await supabase
        .from('skills_strategies')
        .select('*')
        .eq(relationalTableRequiredColumn, params.serviceId)

      const skillsIds = relationData?.map((value) => value[params.service === ServiceEnum.SKILLS ? 'strategy_id' : 'skill_id']) ?? []

      const { data, error } = await supabase
        .from(params.service === ServiceEnum.SKILLS ? 'strategies' : 'skills')
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.title)}</Text>
        }}
      />
      {
        !isFetching
          ? (
            <Page
              skills={skills}
              onRefresh={handleGetStrategies}
              description={params.description as string}
              title={params.title as string}
              service={params.service as string}
              image={String(params.image) ?? ''}
            />
          )
          : (
            <Center h='full'>
              <ActivityIndicator color='#1E3A8A' />
            </Center>
          )
      }
    </>
  )
}
