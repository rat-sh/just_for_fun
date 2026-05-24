import io, { Socket } from 'socket.io-client'

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

let socket: Socket | null = null

export const initSocket = (userId: string): Socket => {
  if (socket?.connected) {
    return socket
  }

  socket = io(socketUrl, {
    auth: {
      userId,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.on('connect', () => {
    console.log('[v0] Socket connected:', socket?.id)
  })

  socket.on('disconnect', () => {
    console.log('[v0] Socket disconnected')
  })

  socket.on('error', (error) => {
    console.error('[v0] Socket error:', error)
  })

  return socket
}

export const getSocket = (): Socket | null => {
  return socket
}

export const closeSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
