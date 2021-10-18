# Chat API

This API will be utilized to send message between users.
 - [Requirements specification](./TRD.md)
 - [Swagger spec](./api.swagger.yml)
 - [Testing strategy](./Testing.md)

This API allows client to connect with the server via socket instead of only sending HTTP requests because in order to maintain real-time communication, it is required for the server to intiate the transaction whenever there is an incoming message for any client actively connected to the server.

## Request flow

1. Server accepts socket connection.
2. Whenver a client connects to the client, the unread messages are fetched from the server.
3. Server maintains a mapping of the actively connected the user and socket Id on which the user is connected.
4. While the user is connected, if there is any other active user sending a message to this user, server uses the user-socket mapping to send the message to the user.

## Steps to test the POC offline

1. Initially we have to start the server using `node server.js` command.
2. On another terminal, we'll have to start a client using `node receiver.js` which will be the receiver of message in this scenario, it has the username hardcoded in it for testing purposes.
3. On another terminal window, we will start another client using `node sender.js` which will be the message sender. This file has hardocded values for user name and message for testing purposes.
4. Once the sender client is started, we can see the message being to sent to receiver, and message getting logged in the receiver terminal window.

## Alternate flow

If we don't want to use socket connection, we can use HTTP requests for the commnications from client->server and for server->client instead server initiating the transaction, client can keep polling server at a regular interval to check if there are any messages (updates).
