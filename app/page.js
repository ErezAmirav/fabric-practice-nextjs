import FabricCanvas from '@/components/FabricCanvas';
import BackgroundVideo from '@/components/BackgroundVideo';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="z-0">
          <BackgroundVideo />
        </div>
        <div className="z-10">
          <FabricCanvas />
        </div>
      </div>
    </main>
  );
}
