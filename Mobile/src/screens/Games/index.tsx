import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { GameParams } from '../../@types/navigation';

import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const game = params as GameParams;

  function handleGoToBack() {
    navigation.goBack()
  }

  useEffect(() => {
    if (duos.length === 0) {
      (async function getGamesApi() {
        const response = await fetch(`http://ipDaSuaMaquina/games/${game.id}/ads`).then(response => response.json());

        setDuos(response);
      })()
    }
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoToBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subTitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={() => { }} />}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  )
}