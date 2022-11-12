

export function friendReducer(state = null
    ,action) {
  switch (action.type) {
    case "FriendData":
      return action.payload;
    default:
      return state;
  }
}
