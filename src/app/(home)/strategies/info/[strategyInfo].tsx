import Text from "@components/text";
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Image, ScrollView, VStack } from 'native-base';
import { RefreshControl } from 'react-native';

export default function Home() {
  const params = useLocalSearchParams()

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
          <Text color='blue.600' fontSize='16' fontWeight='medium'>Estratégias</Text>
          <Text color='gray.600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        </VStack>
      </ScrollView>
    </>
  )
}
