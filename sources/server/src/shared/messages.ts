/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * Message type constants used by socket.io for client-server communication.
 */


/**
 * Message type sent from client to server to invoke a kernel or notebook action.
 */
export var action = 'action';

/**
 * Message type sent from client to server when a client disconnects.
 */
export var disconnect = 'disconnect';

/**
 * Message type from server to client to request that the WebSocket connection be terminated.
 */
export var terminateConnection = 'terminate connection';

/**
 * Message type sent from server to client(s) to update their session state.
 */
export var update = 'update';