import { Card } from '@components/card';
import { Button, Input } from '@components/form';
import { Modal } from '@components/modal';
import Text from "@components/text";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import debounce from 'lodash.debounce';
import { Box, Checkbox, FlatList, HStack, ScrollView, Select, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import Toast from "react-native-toast-message";

export enum ServiceEnum {
  SKILLS = "Competências",
  STRATEGY = "Estratégias"
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [cardId, setCardId] = useState<number | string>()
  const [strategies, setStrategies] = useState([])
  const [skills, setSkills] = useState([])
  const [service, setService] = useState<"Competências" | "Estratégias">(ServiceEnum.SKILLS)

  const viewingService = service === ServiceEnum.SKILLS ? skills : strategies

  const cardImage = service === 'Competências' ? "https://cdn-icons-png.flaticon.com/512/2847/2847502.png" : 'https://cdn-icons-png.flaticon.com/512/609/609050.png'

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
  async function handleGetSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')

      setSkills(data as [])

      if (error) throw Error(error?.message)
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err.message,
      })
    }
  }

  async function handleNavigate(title: string, description: number | string, id: number | string, image: string) {
    setCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.push({ pathname: `service/${title}`, params: { title, serviceId: id, description, service, image } })
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
          .like('title', `%${search.toUpperCase()}%`)
      else
        data = await supabase
          .from('strategies')
          .select('*')

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

  async function handleSaveHasViewWelcomeText(e: boolean) {
    await AsyncStorage.setItem('welcome', String(e))
  }

  useEffect(() => {
    async function getShowWelcome() {
      try {
        const showWelcome = await AsyncStorage.getItem('welcome')
        setOpen(showWelcome !== 'true')
      } catch (err) {
        console.log(err)
      }
    }
    getShowWelcome()

    handleGetStrategies()
    handleGetSkills()
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text color={props.tintColor} fontSize='lg'>{service}</Text>
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
            <Text color='blue.600' fontSize='16' fontWeight='medium'>{service}</Text>
            <Text color='gray.600'>Aqui você encontra as {service} a serem desenvolvidas.</Text>
          </VStack>

          <Input
            placeholder='Pesquisar'
            onChangeText={debouncedSearch}
          />
          {(strategies.length && skills.length) ? (
            <VStack>
              <Select
                selectedValue={service}
                maxWidth="170"
                maxH="9"
                mb="4"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                mt={1}
                onValueChange={value => setService(value as "Competências" | "Estratégias")}
              >
                <Select.Item label={ServiceEnum.SKILLS} value={ServiceEnum.SKILLS} />
                <Select.Item label={ServiceEnum.STRATEGY} value={ServiceEnum.STRATEGY} />
              </Select>
              <HStack space='md'>
                <FlatList
                  data={viewingService.slice(0, viewingService.length / 2)}
                  ItemSeparatorComponent={() => <Box height='4' />}
                  renderItem={({ item }: any) => (
                    <Card.Root>
                      <Card.Image src={cardImage} />
                      <Text fontSize='md' textAlign='center'>{item?.title}</Text>
                      <Card.Button
                        onPress={() => handleNavigate(item?.title, item?.description, item?.id, item?.image)}
                        isLoading={cardId === item?.id && isLoading}
                        disabled={isLoading}
                      >
                        <Text color='white'>Ver Mais</Text>
                        <AntDesign name="arrowright" size={16} color='white' />
                      </Card.Button>
                    </Card.Root>
                  )}
                />
                <FlatList
                  data={viewingService.slice(viewingService.length / 2)}
                  ItemSeparatorComponent={() => <Box height='4' />}
                  renderItem={({ item }: any) => (
                    <Card.Root>
                      <Card.Image src={cardImage} />
                      <Text fontSize='md' textAlign='center'>{item.title}</Text>
                      <Card.Button
                        onPress={() => handleNavigate(item?.title, item?.description, item?.id, item?.image)}
                        isLoading={cardId === item?.id && isLoading}
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
          ) : <></>}
        </VStack>
        <Modal isVisible={open} close={() => setOpen(false)} height={600} >
          <VStack space={10}>
            <VStack space={6}>
              <Text>Olá, professor(a)!</Text>
              <Text>Bem-vindo (a) ao nosso aplicativo.</Text>
              <Text>Estamos muito felizes em tê-lo(a) conosco!</Text>
              <Text textAlign={'justify'}>
                Este aplicativo foi criado para tornar o processo de preparação de suas aulas eficiente e dinâmico.{'\n'}
                Explore as funcionalidades disponíveis projetadas para simplificar seu trabalho e enriquecer a experiência de ensino.{'\n'}
                Aproveite ao máximo o aplicativo!
                {'\n'}
                <Text fontWeight='bold'>Desejamos a você uma excelente experiência e sucesso em suas aulas.{'\n'}</Text>
              </Text>
              <Checkbox value='false' _text={{ fontSize: 12 }} onChange={handleSaveHasViewWelcomeText}>não mostrar novamente</Checkbox>
            </VStack>
            <Button onPress={() => setOpen(false)}>Continuar</Button>
          </VStack>
        </Modal>
      </ScrollView>
    </>
  )
}
