import { UtensilsCrossed, Leaf } from 'lucide-react-native';

export default function SplashScreen() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#2D3A28] via-[#3D4D36] to-[#4A5A42] flex flex-col items-center justify-center">
      <div className="animate-fade-in">
        {/* Logo */}
        <div className="relative mb-6">
          <div className="relative">
            <UtensilsCrossed className="w-24 h-24 text-[#FFF8F0]" strokeWidth={1.5} />
            <Leaf className="w-10 h-10 text-[#E8DFD0] absolute -top-2 -right-2" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-[#FFF8F0] text-center mb-2">
          Foodies
        </h1>
        <p className="text-[#E8DFD0] text-center">
          Your Personal Kitchen Assistant
        </p>
      </div>
    </div>
  );
}
 