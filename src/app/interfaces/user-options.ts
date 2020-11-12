export interface Login {
  username: string;
  password: string;
  email: string;
}

export interface User {
  name: string;
  uId: number;
}

export interface ChatItem {
  customerName: string;
  customerNumber: number;
  cId: number;
  handlingAgent: number;
  messages: Messages;
  chatId: string;
  hasOpened?: boolean;
  newMsgCount?: number;
  messageCount?: number;
  type?: string;
  typing?:any;
}

export interface Chats extends Array<ChatItem> {}

export interface GetChatParams {
startDate: string;
endDate: string;
type: string;
chatId?: string;
cId?: string;
startTime?: string;
endTime?: string;
}

export interface $date {
  $date: number;
}

export interface msg_attachment {
  type?: string;
  url?: string;
}

export interface Message {
  message?: string;
  contentType?: string;
  imageUrl?: string;
  actionBy?: any;
  actedDateTime?: $date;
  attachment?: msg_attachment;
  action?: string;
  eId?: number;
  chatId?: string;
  pickup?: boolean;
  actionId?: string;
  status?: number;
}

export interface Messages extends Array<Message> {}

export interface Client {
  city: string;
  state: string;
  country?: string;
  countryCode: string;
}

export interface Conversation {
  cId: number;
  eId: number;
  chatId: string;
  customerName: string;
  customerNumber: string;
  client?: Client;
  messages: Messages;
  handlingAgent: number;
  participants: Array<number>;
  agentNote?: string;
  agentTag?: string;
  history?: string;
  typing?:any;
}

export interface Conversations {
  
}

export interface id {
    $oid: string;
}

export interface PreviewData {
  _id?: id;
  name?: string;
  desc?: string;
  url?: string;
  type?: string;
  isVideo?: boolean;
  isAudio?: boolean;
  isImage?: boolean;
  isDocument?: boolean;
  isUrl?: boolean;
  isMap?: boolean;
}

export interface attachments extends Array<PreviewData> {

}

export interface PreviewItem {
  data: PreviewData;
}

export interface Preview extends Array<PreviewItem> {
}

export interface Agent {
  uId?: number;
  name?: string;
  emailId?: string;
}

export interface Agents extends Array<Agent> {

}

export interface Department {
  _id: id;
  name?: string;
  desc?: string;
}

export interface Departments extends Array<Department> {

}


export interface Customer {
  id: number;
  name: string;
  number: string;
  chatId: string;
}

export interface Notes {
  tag: Array<any>;
  note: any;
}

export interface popOver {
  page: string;
  process?: string;
  agentId?: number;
  userId?: number;
  count: number;
}

// export interface login { 
//   password: any;
// }