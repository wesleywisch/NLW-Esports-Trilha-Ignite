import { useState, useEffect } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from './styles';

export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, bannerUrl, title }: GameCardProps) {
    navigation.navigate('game', { id, bannerUrl, title });
  }

  useEffect(() => {
    if (games.length === 0) {
      (async function getGamesApi() {
        const response = await fetch(`http://ipdasuamaquina/games`).then(response => response.json());

        setGames(response);
      })()
    }
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subTitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard
            data={item}
            onPress={() => handleOpenGame(item)}
          />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}