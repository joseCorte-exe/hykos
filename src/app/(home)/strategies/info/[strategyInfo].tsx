import Text from "@components/text";
import { supabase } from "@lib/supabase";
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Image, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from "react";
import { RefreshControl } from 'react-native';

export default function Home() {
  const [isFetching, setIsFetching] = useState(false)
  const [skill, setSkill] = useState({})
  const params = useLocalSearchParams()

  async function handleGetStrategies() {
    setIsFetching(true)
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', params.skillId)

      console.log(data)

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
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.strategyInfo)}</Text>
        }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} enabled={true} onRefresh={() => console.log('refreshing')} />}>
        <Box w='full' h='64'>
          <Image source={{ uri: 'https://pelotasturismo.com.br/img/full/wcaRXTHVsiBx5qm2xAmoh33vgkTZG9nzQdpxBCCW.jpg' }} resizeMode="cover" size='full' />
        </Box>
        <VStack padding='6' space='2'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>{skill?.title}</Text>
          <Text color='gray.600'>{skill?.description}</Text>
        </VStack>
      </ScrollView>
    </>
  )
}
