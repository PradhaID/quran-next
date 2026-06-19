import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const client = await clientPromise;
    const db = client.db();
    
    const surahs = await db.collection('surahs').find({}, {
      projection: { 
        number: 1, 
        name: 1, 
        name_latin: 1, 
        number_of_ayah: 1, 
        revelation_type: 1,
        [`translations.${locale}`]: 1
      }
    }).sort({ number: 1 }).toArray();

    return NextResponse.json({ success: true, count: surahs.length, data: surahs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
