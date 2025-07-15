import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import VerifiedExpert from '../../../../assets/icons/articleTypes/verified_expert.svg';
import VerifiedResearcher from '../../../../assets/icons/articleTypes/verified_researcher.svg';
import VerifiedScience from '../../../../assets/icons/articleTypes/verified_science.svg';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';

interface InfoModalProps {
  infoModalOpen: boolean;
  setInfoModal: (open: boolean) => void;
  materialType: 'verified_science' | 'verified_researcher' | 'verified_expert' | 'none';
  onButton: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  infoModalOpen,
  setInfoModal,
  materialType,
  onButton,
}) => {
  const renderContent = () => {
    switch (materialType) {
      case 'verified_science':
        return {
          icon: <VerifiedScience width={60} height={60} />,
          title: 'Результаты научных исследований.',
          description:
            'Информация подтверждена научными работами с тестированием на людях или животных.',
        };
      case 'verified_researcher':
        return {
          icon: <VerifiedResearcher width={60} height={60} />,
          title: 'Рекомендации профессиональных сообществ.',
          description:
            'Данный материал подтвержден мнением медицинских и других организаций в вопросах здоровья и хорошего самочувствия.',
        };
      case 'verified_expert':
        return {
          icon: <VerifiedExpert width={60} height={60} />,
          title: 'Мнение специалистов в конкретной области,',
          description:
            'на основе их практики и собственной интерпретации существующих исследований.',
        };
      default:
        return {
          icon: null,
          title: 'Нет данных',
          description: 'Для этого материала не указано основание.',
        };
    }
  };

  const { icon, title, description } = renderContent();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={infoModalOpen}
      onRequestClose={() => setInfoModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setInfoModal(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              {/* Закрывающая кнопка */}
              <Pressable style={styles.closeButton} onPress={() => setInfoModal(false)}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>

              <View style={styles.iconWrapper}>{icon}</View>
              <IfgText color="black" style={[styles.title, gs.fontBodyMedium, gs.bold]}>
                {title}
              </IfgText>
              <IfgText color="black" style={[styles.description, gs.fontCaption]}>
                {description}
              </IfgText>

              <View style={gs.mt16} />
              <Pressable onPress={onButton} style={styles.button}>
                <IfgText color="white">Подробнее</IfgText>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    fontSize: 20,
    color: '#333',
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 12,
  },
  description: {
    textAlign: 'center',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#54B676',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
});
