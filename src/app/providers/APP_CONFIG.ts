export const AppConfig: any = {
    ENV : {
        AUTH_TOKEN : '',
        CHATS : {
          ACTIVECHATS : 'active',
          CLOSEDCHATS : 'closed',
          CHATTRANSFER : 'Transfer Chat',
          INVITEAGENT : 'Invite Agent',
          CLOSECHAT : 'Close Chat',
          LEAVECHAT : 'Leave Chat',
          CUSTOMERDETAILS : 'Customer Details'
        },
        WEBSOCKET : {
          INITIAL_RECONNECT : 2000,
          RECONNECT_INTERVAL : 3000,
       },
        NETWORK : 'online',
        ATTACHMENT : {
          DOCTYPE : 0,
          MEDIATYPE : 1,
          MAPTYPE : 2,
          URLTYPE : 3,
          MSGTYPE : 7,
          DOCUMENT : 'document',
          MAP : 'map',
          URL : 'url',
          MESSAGE : 'message',
          MEDIA : 'media'
        }
    }
}

