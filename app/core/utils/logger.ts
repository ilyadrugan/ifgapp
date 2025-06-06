import RNFS from 'react-native-fs';
import { getDeviceName } from 'react-native-device-info';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_FILE_PATH = `${RNFS.DocumentDirectoryPath}/ifeelgood-log.txt`;
const CLEAN_INTERVAL_DAYS = 3;
const LAST_CLEAN_KEY = 'log_last_cleaned_at';

function daysBetween(date1, date2) {
  const diffMs = Math.abs(date2 - date1);
  return diffMs / (1000 * 60 * 60 * 24);
}

async function maybeCleanLogFile() {
  try {
    const lastCleanStr = await AsyncStorage.getItem(LAST_CLEAN_KEY);
    const now = new Date();

    if (lastCleanStr) {
      const lastClean = new Date(lastCleanStr);
      const diff = daysBetween(lastClean, now);
      if (diff >= CLEAN_INTERVAL_DAYS) {
        await RNFS.unlink(LOG_FILE_PATH).catch(() => {});
        await AsyncStorage.setItem(LAST_CLEAN_KEY, now.toISOString());
      }
    } else {
      await AsyncStorage.setItem(LAST_CLEAN_KEY, now.toISOString());
    }
  } catch (err) {
    console.warn('Ошибка при проверке лог-файла:', err);
  }
}

export async function logMessage(message: string) {
  try {
    await maybeCleanLogFile();

    const deviceName = await getDeviceName();
    const timestamp = new Date().toISOString();
    const logLine = `[${deviceName}]: [${timestamp}]: ${message}\n`;

    await RNFS.appendFile(LOG_FILE_PATH, logLine, 'utf8');
  } catch (err) {
    console.error('Ошибка при логировании:', err);
  }
}

export async function getLogFilePath() {
  return LOG_FILE_PATH;
}


async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Доступ к хранилищу',
        message: 'Нужно разрешение для скачивания логов',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export async function downloadLogFile() {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert('Нет доступа', 'Разрешение на хранилище не получено');
    return;
  }

  const sourcePath = `${RNFS.DocumentDirectoryPath}/ifeelgood-log.txt`;
  const targetPath =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/ifeelgood-log.txt`
      : `${RNFS.DocumentDirectoryPath}/ifeelgood-log.txt`;
  const fileExists = await RNFS.exists(sourcePath);
  if (!fileExists) {
    Alert.alert('Файл не найден', 'Лог-файл ещё не создан');
    return;
  }

  try {
    await RNFS.copyFile(sourcePath, targetPath);
    Alert.alert('Успех', `Файл сохранён в ${targetPath}`);
  } catch (err) {
    Alert.alert('Ошибка', `Не удалось скачать: ${err.message}`);
  }
}

export async function shareLogFile() {
  const logFilePath = `${RNFS.DocumentDirectoryPath}/ifeelgood-log.txt`;

  const fileExists = await RNFS.exists(logFilePath);
  if (!fileExists) {
    Alert.alert('Файл не найден', 'Лог-файл ещё не создан');
    return;
  }

  const fileUrl = Platform.OS === 'android'
    ? `file://${logFilePath}` // Android требует file://
    : logFilePath;

  try {
    await Share.open({
      title: 'Поделиться логом',
      url: fileUrl,
      type: 'text/plain',
      failOnCancel: false,
    });
  } catch (err) {
    console.error('Ошибка при отправке лога:', err);
    Alert.alert('Ошибка', 'Не удалось поделиться файлом');
  }
}
