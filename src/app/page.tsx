import Link from "next/link";

export default function HomePage() {

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                Fast Delivery, Fresh Products
              </h1>
              <p className="text-lg md:text-xl mb-8 text-purple-100">
                Get everything you need delivered to your doorstep in minutes. 
                Fresh groceries, daily essentials, and more!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/category/fruits"
                  className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                </Link>
                <Link
                  href="/category/fruits"
                  className="px-8 py-3 bg-purple-700/50 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-purple-700/70 transition-all border border-white/20"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            
            {/* Right side - Visual elements */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="text-4xl mb-2">🚚</div>
                    <p className="text-sm font-medium">10 Min Delivery</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="text-4xl mb-2">⭐</div>
                    <p className="text-sm font-medium">5 Star Rated</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="text-4xl mb-2">🛒</div>
                    <p className="text-sm font-medium">Easy Ordering</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="text-4xl mb-2">💳</div>
                    <p className="text-sm font-medium">Secure Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">Get your orders delivered in minutes, not hours.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="font-semibold text-lg mb-2">Fresh Products</h3>
          <p className="text-gray-600 text-sm">Only the freshest products, handpicked for you.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
          <p className="text-gray-600 text-sm">Competitive prices with great deals every day.</p>
        </div>
      </section>
    </div>
  );
}
