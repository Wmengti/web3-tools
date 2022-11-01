import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://0x3c:3DWi0ygwr0jFf6RN@cluster0.ijwhvch.mongodb.net/Calender?retryWrites=true&w=majority'
    );

    const db = client.db();

    const daoCollcection = db.collection('appointment');
    const result = await daoCollcection.insertOne(data);

    client.close();
    res.status(201).json({ message: ' Proposal has been sent!' });
  }
}
export default handler;
