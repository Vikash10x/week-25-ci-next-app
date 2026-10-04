import { connectDb, db } from "@repo/db";

export default async function Home() {
  await connectDb();
  const user = await db.orm.public.User.first();

  return (
    <div>
      {user?.username}
      {user?.password}
    </div>
  );
}
