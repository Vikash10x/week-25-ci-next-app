import { connectDb, db } from "@repo/db";

export default async function Home() {
  await connectDb();
  const user = await db.orm.public.User.first();

  return (
    <div>
      name:
      {user?.username}
      password:
      {user?.password}
    </div>
  );
}
