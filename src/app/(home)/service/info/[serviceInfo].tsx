import Text from "@components/text";
import { supabase } from "@lib/supabase";
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Button, FlatList, Image, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from "react";
import { RefreshControl } from 'react-native';
import { ServiceEnum } from "../../home";

export default function Home() {
  const [isFetching, setIsFetching] = useState(false)
  const [skill, setSkill] = useState<any>({})
  const params = useLocalSearchParams()

  async function handleGetStrategies() {
    setIsFetching(true)
    try {
      const { data, error } = await supabase
        .from(params.service === ServiceEnum.SKILLS ? 'strategies' : 'skills')
        .select('*')
        .eq('id', params.serviceId)

      data && setSkill(data[0] as object)
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
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.title)}</Text>
        }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} enabled={true} onRefresh={() => console.log('refreshing')} />}>
        <Box w='full' h='64'>
          <Image alt='' source={{ uri: 'https://pelotasturismo.com.br/img/full/wcaRXTHVsiBx5qm2xAmoh33vgkTZG9nzQdpxBCCW.jpg' }} resizeMode="cover" size='full' />
        </Box>
        <VStack padding='6' space='2'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>{skill?.title}</Text>
          <Text color='gray.600'>{skill?.description}</Text>
        </VStack>
        {params.service === ServiceEnum.SKILLS && <VStack padding='6' space='2'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>Sequência de aplicação</Text>
          <FlatList
            flexWrap='wrap'
            ItemSeparatorComponent={() => <Box h='2' />}
            data={skill.evaluation_instruments?.evaluation_instruments}
            flex={1}
            renderItem={({ index, item }) => (
              <Box p='3' bgColor='gray.300' borderRadius='md' flexBasis='fit-content'>
                <Text flexBasis='fit-content'>{item as any}</Text>
              </Box>
            )}
          />
          <Button bgColor='blue.700' mt='6'>Como Avaliar</Button>
        </VStack>}
      </ScrollView>
    </>
  )
}
