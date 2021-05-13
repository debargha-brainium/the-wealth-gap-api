module.exports = [
    {
        path: "/messages",
        middleware: "token.validateToken",
        children:[
            // {
            //     path: "/",
            //     method: "post",
            //     middleware: "validation.anysearch",
            //     controller: "common.getChatHistory"
            // },
            // {
            //     path: "/of/:user_id",
            //     controller: "common.getMessages"
            // },
            // {
            //     path: "/of/:user_id",
            //     method: "put",
            //     controller: "common.updateMessageStatus"
            // },
            {
                path: "/to/:user_id",
                method: "post",
                middleware: "validation.content",
                controller: "chat.sendMessage"
            }
        ]
    },
]