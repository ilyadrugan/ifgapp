import React, { useState, useMemo, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ArrowShort from '../../../../assets/icons/arrow-short-right.svg';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import CalendarIcon from '../../../../assets/icons/calendar.svg';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { observer } from 'mobx-react';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const CustomCalendar = observer(() => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Текущая дата
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Выбранная дата
  const [calendarMode, setCalendarMode] = useState<'month' | 'week'>('month');
  const [boxWidth, setBoxWidth] = useState(0);
  const toggleCalendarMode = () => {
    setCalendarMode((prevMode) => {
      const newMode = prevMode === 'month' ? 'week' : 'month';
      return newMode;
    });
  };
  // Получить дни текущего месяца
  const getDaysInMonth = (year: number, month: number) => {
    const days: Date[] = [];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // Сдвиг до понедельника
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - startOffset);

    const totalDays =
      Math.ceil((startOffset + lastDayOfMonth.getDate()) / 7) * 7; // Полные недели

    for (let i = 0; i < totalDays; i++) {
      days.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return days;
  };
  // Получить текущую неделю (от текущей даты)
  const getCurrentWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = (startOfWeek.getDay() + 6) % 7; // Сдвиг так, чтобы понедельник был первым
    startOfWeek.setDate(date.getDate() - dayOfWeek);

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(startOfWeek));
      startOfWeek.setDate(startOfWeek.getDate() + 1);
    }
    return week;
  };

  // Получить дни для отображения (месяц или неделя)
  const daysToRender = useMemo(() => {
    if (calendarMode === 'month') {
      return getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    } else {
      return getCurrentWeek(currentDate);
    }
  }, [currentDate, calendarMode]);

  // Переключение между месяцами/неделями
  const handleIncrement = () => {
    const newDate = new Date(currentDate);
    if (calendarMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleDecrement = () => {
    const newDate = new Date(currentDate);
    if (calendarMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  // Выбор дня
  const handleDayPress = async (date: Date) => {
    // console.log();
    setSelectedDate(date);
    await dailyActivityStore.getDailyActivity(date.toISOString().split('T')[0]);
  };

  // Проверить, выбран ли день
  const isSelected = (date: Date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

  return (
    <View>
      {/* Заголовок */}
      <View style={s.header}>
        <TouchableOpacity onPress={handleDecrement}
                style={{ transform: [{rotate: '180deg'}]}}>
            <ArrowShort />
        </TouchableOpacity>
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.medium, gs.fontCaption]}>
          {months[currentDate.getMonth()]}
        </IfgText>
        <TouchableOpacity onPress={handleIncrement}>
            <ArrowShort />
        </TouchableOpacity>
      </View>


      {/* Дни недели */}
      <View style={s.weekDays}>
        {daysOfWeek.map((day) => (
          <View key={day} style={s.weekDayContainer}>
          <IfgText color="#B8B8B8" style={[gs.fontCaptionSmall, gs.medium]}>
            {day}
          </IfgText>
          </View>
        ))}
      </View>

      {/* Календарь */}
      <View
        style={[
          s.calendar,
          calendarMode === 'week' && s.calendarWeek,
        ]}
      >
        {daysToRender.map((date: Date) => (
          <TouchableOpacity
            key={date.toDateString()}
            onLayout={(event) => {
              if (!boxWidth) {
                const { width } = event.nativeEvent.layout;
                setBoxWidth(width);
              }

            }}
            style={[
              s.dayContainer,
              isSelected(date) && s.selectedDay,
              {height: boxWidth},
            ]}
            onPress={() => handleDayPress(date)}

          >
            <IfgText
              color={isSelected(date) ? colors.WHITE_COLOR : colors.SECONDARY_COLOR}
              style={[gs.fontCaptionSmall, gs.bold]}
            >
              {date.getDate()}
            </IfgText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={toggleCalendarMode} style={[s.calendarButton, {height: boxWidth}]}>
          <CalendarIcon />
        </TouchableOpacity>
      </View>

    </View>
  );
});

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
  },
  modeSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modeButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '89%',
  },
  weekDayContainer: {
    alignItems: 'center',
    justifyContent:'center',
    width: '12%',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 6,
    width: '89%',
  },
  calendarWeek: {
    flexWrap: 'nowrap',
  },
  dayContainer: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EBEDF5',
  },
  selectedDay: {
    backgroundColor: colors.GREEN_LIGHT_COLOR,
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: 'white',
  },
  calendarButton: {
    position: 'absolute', // Позиционирование кнопки относительно контейнера
    top: 0,
    right: -42, // Смещение вправо
    width: '12%',
    // height: 36,
    backgroundColor: colors.GREEN_LIGHT_COLOR,
    borderRadius: 20, // Делает кнопку круглой
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomCalendar;
