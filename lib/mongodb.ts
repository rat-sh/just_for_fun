// MongoDB Connection and Chat Integration
import { MongoClient, Db, Collection } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  await client.connect()
  const db = client.db('studyroom')

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getMessagesCollection(): Promise<Collection> {
  const { db } = await connectToDatabase()
  return db.collection('messages')
}

export async function getRoomsCollection(): Promise<Collection> {
  const { db } = await connectToDatabase()
  return db.collection('rooms')
}

export async function getUsersCollection(): Promise<Collection> {
  const { db } = await connectToDatabase()
  return db.collection('users')
}

// Message Model
export interface ChatMessage {
  _id?: string | any
  roomId: string
  userId: string
  username: string
  message: string
  timestamp: Date
  edited?: Date
  reactions?: { [emoji: string]: string[] }
}

// Room Model
export interface StudyRoom {
  _id?: string | any
  code: string
  name: string
  description: string
  category: string
  members: string[]
  maxMembers: number
  isPrivate: boolean
  createdBy: string
  createdAt: Date
}

export async function saveMessage(message: ChatMessage): Promise<ChatMessage> {
  const collection = await getMessagesCollection()
  const result = await collection.insertOne({
    ...message,
    timestamp: new Date(),
  })
  return { ...message, _id: result.insertedId.toString() }
}

export async function getRoomMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
  const collection = await getMessagesCollection()
  return await collection
    .find({ roomId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray() as unknown as ChatMessage[]
}

export async function deleteMessage(messageId: string): Promise<boolean> {
  const collection = await getMessagesCollection()
  const result = await collection.deleteOne({ _id: messageId as any })
  return result.deletedCount === 1
}
