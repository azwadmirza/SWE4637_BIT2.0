import Groups from "./components/groups";

export default function GroupsPage() {
  return (
    <main className="bg-my_bg_image bg-cover background-media flex min-h-screen min-w-screen flex-col items-center justify-between p-12 overflow-hidden">
      <div className="w-full flex justify-end">
        <Groups/>
      </div>
    </main>
  );
}