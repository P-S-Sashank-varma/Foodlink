import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop')" }}>
        {/* Overlay to make the text stand out */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative text-center z-10 text-white pt-32 px-6 max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium tracking-wide bg-white/10 backdrop-blur-sm text-white mb-4">
            Fighting Hunger Together
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Welcome to <span className="text-yellow-300">FoodLink</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Join us in reducing food wastage by donating or requesting food. Together, we can make a difference in the fight against hunger.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link to="/login" className="group bg-white text-black py-3 px-8 rounded-full hover:bg-white/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
              <span className="flex items-center justify-center">
                Login 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/signup" className="group bg-yellow-400 text-black py-3 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
              <span className="flex items-center justify-center">
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
        
        {/* Subtle scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500">Simple Process</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">How FoodLink Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Utensils className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Donate Food</h3>
              <p className="text-gray-600 text-center">
                Restaurants, grocery stores, and individuals can donate excess food items that would otherwise go to waste.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Connect People</h3>
              <p className="text-gray-600 text-center">
                Our platform connects those with excess food to individuals and organizations in need within local communities.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Reduce Waste</h3>
              <p className="text-gray-600 text-center">
                By redistributing excess food, we reduce waste, protect our environment, and ensure everyone has access to nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500">Making A Difference</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Impact So Far</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 */}
            <div className="bg-gray-50 p-10 rounded-2xl transition-transform hover:scale-[1.02] duration-300">
              <h3 className="font-bold text-4xl mb-3 text-yellow-500">10,000+</h3>
              <p className="text-gray-700">Meals donated through our platform</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-gray-50 p-10 rounded-2xl transition-transform hover:scale-[1.02] duration-300">
              <h3 className="font-bold text-4xl mb-3 text-yellow-500">500+</h3>
              <p className="text-gray-700">Active donors across the country</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-gray-50 p-10 rounded-2xl transition-transform hover:scale-[1.02] duration-300">
              <h3 className="font-bold text-4xl mb-3 text-yellow-500">5 tons</h3>
              <p className="text-gray-700">Of food waste prevented monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and brief description */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">FoodLink</h3>
              <p className="text-gray-400 mb-4">
                Connecting excess food with those who need it most.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
                <li><Link to="/partners" className="text-gray-400 hover:text-white transition">Our Partners</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>
            
            {/* Stay Connected */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} FoodLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
