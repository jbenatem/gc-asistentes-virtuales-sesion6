var firstInteraction = true

function createGuid() {  
    function _p8(s) {  
        var p = (Math.random().toString(16)+"000000000").substr(2,8);  
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
    }  
    return _p8() + _p8(true) + _p8(true) + _p8();  
}  

async function generateDirectLineToken() {
    const response = await fetch('INGRESAR URL DE TOKEN CONTROLLER', {
        method: 'POST'
    })
    const { token } = await response.json();
    return token;
}

function CloseChat() {
    document.getElementById("chatbox").style.display = "none";
    document.getElementById("chatbutton").style.display = "flex";
}

async function OpenChat() {
    document.getElementById("chatbutton").style.display = "none";
    document.getElementById("chatbox").style.display = "block";

    if (firstInteraction) {
        // Get welcome message
        // We are using a customized store to add hooks to connect event
        const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                dispatch({
                    type: 'WEB_CHAT/SEND_EVENT',
                    payload: {
                        name: 'webchat/join',
                        value: { language: window.navigator.language }
                    }
                });
            }

            return next(action);
        });

        window.WebChat.renderWebChat(
            {
                directLine: window.WebChat.createDirectLine({
                token: await generateDirectLineToken()
            }),
            store,
            },
            document.getElementById('chatbody')
        );

        firstInteraction = false;
    }    
}