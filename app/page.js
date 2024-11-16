import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
// import Sidebar from "./Sidebar/page";

export default async function Home() {

  const req = await fetch(`${process.env.NEXT_URL}/api/user`, {cache: 'no-store'})
  const data = await req.json()
  // console.log(data)


  return (
    <div className="w-full h-full bg-white flex flex-row">
      <Main/>
    </div>
  );
}
