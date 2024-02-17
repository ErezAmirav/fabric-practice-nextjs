import FabricCanvas from '@/components/FabricCanvas';
import BackgroundVideo from '@/components/BackgroundVideo';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      <div className="grid grid-cols-2 gap-8">

      <FabricCanvas />
      <BackgroundVideo />
      </div>
    </main>
  );
}
