import { Modal } from "@components/modal";
import Text from "@components/text";
import { supabase } from "@lib/supabase";
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Button, FlatList, Image, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from "react";
import { RefreshControl, TouchableOpacity } from 'react-native';
import { ServiceEnum } from "../../home";

export default function Home() {
  const [isFetching, setIsFetching] = useState(false)
  const [open, setOpen] = useState(false)
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

  async function handleNavigate() {
    setOpen(true)
  }

  useEffect(() => {
    handleGetStrategies()
  }, [])

  return (
    <>
      <Modal isVisible={open} close={() => setOpen(false)}>
        <ScrollView>
          <TouchableOpacity activeOpacity={1}>
            <Text color='blue.600' fontSize='16' fontWeight='medium' alignSelf='flex-start'>Ações no Percurso </Text>
            <Text mt={5}>{skill.suggestive_procedure?.replaceAll(';', '\n')}</Text>
            <Text color='blue.600' fontSize='16' fontWeight='medium' alignSelf='flex-start' mt={10}>Formas de Avaliação</Text>
            <Text mt={5}>{skill?.assessment_criteria?.replaceAll('.', '\n')?.replaceAll(':', ':\n')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='md'>{String(params.title)}</Text>
        }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} enabled={true} onRefresh={() => console.log('refreshing')} />}>
        <Box w='full' h='64'>
          <Image alt='' source={{ uri: skill.image }} resizeMode="cover" size='full' />
        </Box>
        <VStack padding='6' space='2'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>Consiste em...</Text>
          <Text color='gray.600'>{skill?.description}</Text>
        </VStack>
        {params.service === ServiceEnum.SKILLS && <VStack padding='6' space='2'>
          <Text color='blue.600' fontSize='16' fontWeight='medium'>Sequência de aplicação</Text>
          <FlatList
            flexWrap='wrap'
            ItemSeparatorComponent={() => <Box h='2' />}
            data={skill.how_evaluation?.evaluation_instruments}
            flex={1}
            renderItem={({ index, item }) => (
              <Box p='3' bgColor='gray.300' borderRadius='md' flexBasis='fit-content'>
                <Text flexBasis='fit-content'>{item as any}</Text>
              </Box>
            )}
          />
          <Button bgColor='blue.700' mt='6' onPress={handleNavigate}>Como Avaliar</Button>
        </VStack>}
      </ScrollView>
    </>
  )
}
