import Search from './_component/Search';

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl p-10">포켓몬 도감</h1>
      <Search />
      <div className="flex text-3xl w-full justify-center p-4">Loading...</div>
    </div>
  );
}
