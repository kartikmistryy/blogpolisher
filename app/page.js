import Main from "./components/Main";
// import Sidebar from "./Sidebar/page";

export default async function Home() {

  const req = await fetch(`${process.env.NEXT_URL}/api/user`, {cache: 'no-store'})
  const data = await req.json()



  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Main/>
    </div>
  );
}
