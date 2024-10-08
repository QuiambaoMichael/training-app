import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images} from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {
  const { isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
   /*  <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Michael!</Text>
      <StatusBar style="auto" />
      <Link href="./home" style={{ color: 'blue' }}>Go to Home</Link>
    </View> */

    <SafeAreaView className="bg-primary h-full"> 
    <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center min-h-[90vh] items-center px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resideMode='contain'

          />
          <View className="relative mt-5" >
            <Text className="text-3xl text-white font-bold text-center">
              Training React Native w/ Expo {' '}
              <Text className="text-secondary-200">
                  Michael Quiambao

              </Text>
              <Image 
              source={images.path}
              className=" w-{50px} absolute -bottom-2 right-5"

              resizeMode="contain"
              />
            </Text>
          </View>


          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Practice Application by Michael C. Quiambao
          </Text>
            <CustomButton
            title="Continue With Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7" />
        </View>

    </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}


