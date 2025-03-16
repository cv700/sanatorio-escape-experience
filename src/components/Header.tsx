
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: 'Experience', href: '#experience' },
    { name: 'Location', href: '#location' },
    { name: 'Wellness', href: '#wellness' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all-300 ${
        isScrolled 
          ? 'glass-panel py-3 md:py-4' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#top" 
          className="font-display text-xl md:text-2xl tracking-wide text-sanatorio-charcoal"
        >
          sanatorio<span className="font-sans font-light text-sanatorio-deepBlue">.com</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm tracking-wide text-sanatorio-charcoal hover:text-sanatorio-deepBlue transition-all-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-sanatorio-deepBlue hover:after:w-full after:transition-all-300"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-sanatorio-charcoal"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full glass-panel md:hidden animate-fade-in">
            <nav className="flex flex-col space-y-4 p-6">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-lg tracking-wide text-sanatorio-charcoal hover:text-sanatorio-deepBlue transition-all-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
