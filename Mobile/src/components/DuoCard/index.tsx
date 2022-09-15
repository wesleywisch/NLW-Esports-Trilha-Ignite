import { View, TouchableOpacity, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

export type DuoCardProps = {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

type Props = {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />

      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} ano${data.yearsPlaying > 1 ? 's' : ''}`}
      />

      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dia${data.weekDays.length > 1 ? 's' : ''} \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label='Chamada de áudio?'
        value={`${data.useVoiceChannel === true ? 'Sim' : 'Não'}`}
        colorValue={`${data.useVoiceChannel === true ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}`}
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  )
}