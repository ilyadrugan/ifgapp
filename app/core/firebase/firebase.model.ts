export interface FirebaseMessagingTokenUpdateModel {
  token: string,
  deviceName: string,
  deviceId: string,
  platformOs: number,
}

export interface FirebaseMessagingTokenDeleteModel {
  deviceId: string,
}

