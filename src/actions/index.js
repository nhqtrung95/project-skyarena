import axios from 'axios';

export const queryArtist = (payload) => {
    const url = process.env.SPOTIFY_BASE_URL + '?q=' + payload + '&type=artist&limit=1';
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_ARTIST',
                    payload: response
                })
            });

    };
};
export const fetchChatRoom = (payload) => {
    const url =  '/message/' + payload.id.toString();
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_CHAT_ROOM',
                    payload: response
                });
                var friendId;
                if(friend.userId === req.user.id){
                    friendId = friend.toUserId;
                }else{
                    friendId = friend.userId;
                }
                console.log(friendId);
                payload.socket.emit("LOAD_CHAT_ROOM",{
                    user: payload.props.user.id,
                    friend: friendId,
                    room: payload.friend.messageRoomId.toString()
                });
            });

    };
};
export const newMessage = (payload) => {
    return {
        type: 'NEW_MESSAGE',
        payload: payload,
    }
};

export const fetchStatus = () => {
    const url = '/message/status';
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_STATUS',
                    payload: response.data
                })
            });

    };
};
