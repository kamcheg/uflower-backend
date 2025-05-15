export interface TelegramUpdate {
  message?: TelegramMessage;
}

export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    username?: string;
    first_name?: string;
    last_name?: string;
  };
  text?: string;
}
