import admin from "@/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      displayName,
      first_name,
      last_name,
      dob,
      phone_number,
      province,
      street,
      postal_code,
      role,
    } = await req.json();
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    await admin.firestore().collection("Users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "ACTIVE",
      first_name,
      last_name,
      dob,
      phone_number,
      province,
      street,
      postal_code,
      role,
    });
    return NextResponse.json({ uid: user.uid }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
