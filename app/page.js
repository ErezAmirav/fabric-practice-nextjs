'use client'
import FabricCanvas from '@/components/FabricCanvas';
import BackgroundVideo from '@/components/BackgroundVideo';
import { Provider } from 'react-redux';
import store from '@/store';

export default function Home() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
