/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Star, 
  MapPin, 
  Clock, 
  Coffee, 
  Utensils, 
  Users, 
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Instagram,
  Facebook,
  Heart,
  MessageCircle,
  Leaf,
  Globe,
  Award,
  X
} from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/tD3kwwGZLLZue9Q27";
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Little+Nolla+Cafe/@-31.8845012,115.850401,17z/data=!4m8!1m2!2m1!1sLittle+Nolla+Cafe!3m4!1s0x2a32adea3a89a05f:0x6f9b8c0a8c0a8c0a!8m2!3d-31.8845012!4d115.850401";
const INSTAGRAM_URL = "https://www.instagram.com/littlenollacafe/";
const FACEBOOK_URL = "https://www.facebook.com/littlenollacafe/";

interface MenuItem {
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  ingredients: string[];
  img: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Croissant Eggs Benedict",
    tag: "The Signature",
    desc: "Flaky house croissant topped with poached eggs and silky hollandaise.",
    longDesc: "A masterclass in brunch. We slice a giant, buttery house-baked croissant, layer it with premium ham or bacon, two cage-free poached eggs, and our secret recipe hollandaise sauce—whisked fresh throughout the morning.",
    ingredients: ["House Croissant", "Cage-free Eggs", "Hand-whisked Hollandaise", "Local Greens", "Premium Bacon/Ham"],
    img: "https://images.unsplash.com/photo-1600326145359-3a44909d1a39?q=80&w=2600&auto=format&fit=crop"
  },
  {
    name: "Pulled Pork Benny",
    tag: "Local Favourite",
    desc: "Smokey pulled pork with a boutique twist on traditional sourdough.",
    longDesc: "Our 12-hour slow-cooked pork shoulder is hand-pulled and seasoned with a house spice rub. Served on toasted artisan sourdough with poached eggs and a hint of apple cider-infused hollandaise for a unique Nolla profile.",
    ingredients: ["12-hour Pork Shoulder", "Artisan Sourdough", "Poached Eggs", "Apple-Cider Hollandaise", "Micro Greens"],
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2600&auto=format&fit=crop"
  },
  {
    name: "Matcha Latte",
    tag: "Crafted Drink",
    desc: "Premium grade vibrant matcha, whisked to perfection.",
    longDesc: "Not all matcha is created equal. We use ceremonial-grade powder sourced directly from Kyoto. It’s whisked by hand to create a smooth, clump-free texture before being combined with velvety steamed boutique milk.",
    ingredients: ["Ceremonial Grade Matcha", "Filtered Water", "Choice of Artisan Milk", "Touch of Honey (Optional)"],
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2600&auto=format&fit=crop"
  }
];

function CommunityPost({ post, index }: { post: { img: string; likes: number; comments: number }; index: number }) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-espresso/5"
    >
      {!hasError ? (
        <img 
          src={post.img} 
          alt="Boutique Post" 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-espresso/10 text-gold/30">
          <Coffee className="w-10 h-10 mb-2 opacity-20" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Boutique Moment</span>
        </div>
      )}
      <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-cream">
        <div className="flex items-center gap-1.5 font-bold">
          <Heart className="w-5 h-5 fill-gold text-gold" /> {post.likes}
        </div>
        <div className="flex items-center gap-1.5 font-bold">
          <MessageCircle className="w-5 h-5" /> {post.comments}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const vibeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: vibeRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-cream">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-espresso/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-cream tracking-tight">
              Little <span className="text-gold">Nolla</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-cream/70 text-xs font-bold tracking-[0.2em] uppercase">
            <a href="#why" className="hover:text-gold transition-colors">Why Nolla</a>
            <a href="#story" className="hover:text-gold transition-colors">Our Story</a>
            <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
            <a href="#community" className="hover:text-gold transition-colors">Community</a>
            <a href="#find-us" className="hover:text-gold transition-colors">Find Us</a>
          </div>
          <a 
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gold text-espresso text-xs font-bold rounded-full hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg shadow-gold/10"
          >
            Visit Us <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop" 
            alt="Warm Cafe Interior" 
            className="w-full h-full object-cover brightness-[0.45]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-espresso" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-8 py-2 px-4 border border-gold/30 rounded-full">
              Your Favourite Hidden Gem
            </span>
            <h1 className="text-6xl md:text-9xl text-cream font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
              Morning, <br />
              <span className="italic text-gold">Elevated.</span>
            </h1>
            <p className="text-lg md:text-2xl text-cream/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the boutique coffee house of Nollamara. <br className="hidden md:block" /> Warmth in every cup, soul in every bite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-10 py-5 bg-gold text-espresso text-sm font-bold rounded-full hover:bg-gold-light transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold/20"
              >
                Find Us in Nollamara
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#menu"
                className="w-full sm:w-auto px-10 py-5 border border-cream/20 text-cream text-sm font-bold rounded-full hover:bg-cream/10 transition-all backdrop-blur-sm"
              >
                View Menu Highlights
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Social Proof + Stats */}
      <div className="bg-espresso-light border-y border-gold/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/10 border-x border-gold/10">
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-cream text-2xl font-serif font-bold">4.4</span>
            <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Google Stars</span>
          </div>
          <div className="py-12 flex flex-col items-center justify-center">
            <span className="text-gold text-3xl font-serif font-bold italic">327+</span>
            <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold text-center">Verified Reviews</span>
          </div>
          <div className="py-12 flex flex-col items-center justify-center">
            <span className="text-cream text-2xl font-serif font-bold italic">Local</span>
            <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold">Community Hub</span>
          </div>
          <div className="py-12 flex flex-col items-center justify-center">
            <span className="text-gold text-3xl font-serif font-bold">6:00</span>
            <span className="text-cream/40 text-[10px] uppercase tracking-widest font-bold text-center">Early Morning Start</span>
          </div>
        </div>
      </div>

      {/* Why Nolla? */}
      <section id="why" className="py-32 bg-cream">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 text-center mb-24"
        >
          <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block">The Nolla Standard</span>
          <h2 className="text-5xl md:text-7xl text-espresso font-serif font-bold mb-8 leading-tight italic">
            Crafted with <br />intention.
          </h2>
          <p className="text-xl text-espresso/70 leading-relaxed max-w-xl mx-auto">
            We believe a neighborhood cafe should be more than just a quick stop. It's a sanctuary where the coffee is precise, the food is honest, and the welcome is genuine.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Coffee className="w-6 h-6" />,
                title: "Signature Brew",
                desc: "Rich, velvety, and balanced. Our beans are selected for character."
              },
              {
                icon: <Utensils className="w-6 h-6" />,
                title: "Artisan Kitchen",
                desc: "From Pulled Pork Benny to our famed Eggs Benedict."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Known Locally",
                desc: "We prioritize people. Your name matters as much as your order."
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Consistent Care",
                desc: "Excellence isn't an accident; it's our daily morning ritual."
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="space-y-4 p-8 border border-gold/10 rounded-2xl hover:bg-white transition-colors"
              >
                <div className="w-12 h-12 bg-espresso text-gold rounded-xl flex items-center justify-center">
                  {f.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-espresso">{f.title}</h4>
                <p className="text-sm text-espresso/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Manifesto (Values) */}
      <section className="py-32 bg-espresso text-cream border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 text-gold group-hover:bg-gold group-hover:text-espresso transition-all">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Uncompromising Quality</h3>
              <p className="text-cream/50 leading-relaxed italic">
                "Sourcing only the finest WA beans and freshest local produce. We believe the distance from farm to table should be measured in blocks, not thousands of miles."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 text-gold group-hover:bg-gold group-hover:text-espresso transition-all">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Earth First</h3>
              <p className="text-cream/50 leading-relaxed italic">
                "Minimizing our footprint, one compostable cup at a time. Sustainability isn't a buzzword; it's our promise to the next generation of Nolla drinkers."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 text-gold group-hover:bg-gold group-hover:text-espresso transition-all">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Nolla Community</h3>
              <p className="text-cream/50 leading-relaxed italic">
                "A space designed for connection. We aren't just selling coffee; we're facilitating the conversations that define Nollamara's vibrant soul."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
              <div className="absolute -inset-4 border border-gold/20 rounded-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2678&auto=format&fit=crop" 
                alt="Boutique Cafe Interior" 
                className="w-full h-[600px] object-cover rounded-2xl relative z-10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold flex items-center justify-center p-8 text-espresso font-serif italic text-2xl text-center leading-tight rounded-3xl z-20 shadow-xl">
                "Not just a cafe, a Nolla home."
              </div>
            </div>
            <div className="lg:pl-12">
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl text-espresso font-serif font-bold mb-8">A Boutique Vision for Nollamara.</h2>
              <div className="space-y-6 text-lg text-espresso/70 leading-relaxed serif-body">
                <p>
                  Little Nolla wasn't born from a business plan, but from a love for the morning ritual. We saw a gap in Perth's northern suburbs for a cafe that combined the sophistication of a city boutique with the soul of a local hangout.
                </p>
                <p>
                  Located in the heart of Nollamara Shopping Centre, we've become the "hidden gem" that locals whisper about. Whether it's our meticulously crafted Matcha Lattes or the way our staff remembers your weekend sourdough preference, every detail is intentional.
                </p>
                <p className="font-serif italic text-espresso font-medium text-xl">
                  Six tables. One bench. A community.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="font-serif font-bold text-espresso text-lg">The Nolla Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-32 bg-espresso text-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Curated Selection</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold italic">The Menu.</h2>
            <p className="mt-6 text-cream/40 text-sm uppercase tracking-widest font-bold">Click for Details</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {MENU_ITEMS.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                onClick={() => setSelectedItem(m)}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-8 border border-gold/10">
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80" />
                </div>
                <div className="absolute bottom-12 left-0 right-0 px-8">
                   <div className="mb-2">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] font-sans">{m.tag}</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-cream mb-3">{m.name}</h4>
                  <p className="text-sm text-cream/60 leading-relaxed line-clamp-2">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedItem && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedItem(null)}
                  className="absolute inset-0 bg-espresso/90 backdrop-blur-md"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative z-10 w-full max-w-4xl bg-cream rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2"
                >
                  <div className="relative aspect-video md:aspect-auto">
                    <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-6 left-6 p-2 bg-espresso text-cream rounded-full md:hidden"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-10 md:p-12 overflow-y-auto">
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="hidden md:block absolute top-6 right-6 p-2 text-espresso hover:text-gold transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <span className="text-gold font-bold tracking-widest uppercase text-[10px] mb-4 block">Selection Profile</span>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-6">{selectedItem.name}</h3>
                    <p className="text-lg text-espresso/70 leading-relaxed mb-8">
                      {selectedItem.longDesc}
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-bold text-espresso text-[11px] uppercase tracking-widest mb-4">Core Components</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.ingredients.map((ing, k) => (
                            <span key={k} className="px-4 py-1.5 bg-espresso/5 text-espresso/60 text-xs rounded-full border border-espresso/10">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                      className="mt-10 w-full py-4 bg-espresso text-cream font-bold rounded-full flex items-center justify-center gap-2 hover:bg-espresso-light transition-all"
                    >
                      Find it at Nolla <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          
          <div className="mt-20 text-center">
             <a href={GOOGLE_MAPS_URL} className="inline-flex items-center gap-3 text-gold hover:text-white transition-colors group">
              <span className="font-bold text-xs uppercase tracking-[0.3em]">Full Menu at the Cafe</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>
      </section>

      {/* Vibe Section with Parallax */}
      <section ref={vibeRef} id="vibe-parallax" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <img 
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2670&auto=format&fit=crop" 
            alt="Atmospheric Cafe" 
            className="w-full h-full object-cover brightness-[0.2]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-espresso/20 backdrop-blur-[1px]" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl text-cream font-serif italic font-light leading-relaxed">
              "Six tables. One bench. An outdoor area. And the kind of coffee that makes you stay longer than you planned."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Community / Live Feed */}
      <section id="community" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-10 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-espresso italic mb-4">Nolla Life.</h2>
              <p className="text-xl text-espresso/60 max-w-md">Live from our boutique coffee house in Nollamara.</p>
            </div>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 bg-espresso text-gold rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 bg-espresso text-gold rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", likes: 124, comments: 12 },
              { img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop", likes: 89, comments: 5 },
              { img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop", likes: 210, comments: 18 },
              { img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop", likes: 156, comments: 9 },
              { img: "https://images.unsplash.com/photo-1497933321027-999d281db332?q=80&w=800&auto=format&fit=crop", likes: 77, comments: 4 },
              { img: "https://images.unsplash.com/photo-1461023233267-078af58d4c47?q=80&w=800&auto=format&fit=crop", likes: 312, comments: 24 },
              { img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop", likes: 198, comments: 11 },
              { img: "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?q=80&w=800&auto=format&fit=crop", likes: 143, comments: 7 },
            ].map((post, k) => (
              <CommunityPost key={k} post={post} index={k} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-espresso/10 text-espresso font-bold rounded-full hover:bg-espresso hover:text-white transition-all inline-block"
            >
              Follow @LittleNolla
            </a>
          </div>
        </div>
      </section>

      {/* FAQ & Community Questions */}
      <section className="py-24 bg-white border-y border-gold/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center text-espresso mb-16">The Local's Guide to Nolla</h2>
          <div className="space-y-10">
            {[
              { q: "Are you dog friendly?", a: "Absolutely. Our outdoor seating area is a favourite for local pups and their humans. We even have water bowls ready." },
              { q: "Where is the best place to park?", a: "As we are located in the Nollamara Shopping Centre, there is ample free parking right at our doorstep." },
              { q: "Do you offer gluten-free or vegan options?", a: "Yes. From GF bread alternatives to several plant-based brunch options, we cater for dietary needs without compromising on flavour." },
              { q: "Can I host a small event?", a: "Yes, we love hosting intimate gatherings. Speak to our staff in-store for boutique catering options." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-gold font-serif text-3xl font-bold opacity-30">{i+1}.</span>
                <div>
                  <h4 className="text-xl font-bold text-espresso mb-3">{item.q}</h4>
                  <p className="text-espresso/60 leading-relaxed font-light">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section id="find-us" className="py-32 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 h-[600px] rounded-[2.5rem] overflow-hidden border-[1.5rem] border-white shadow-2xl relative shadow-espresso/10">
              <iframe 
                title="Little Nolla Cafe Official Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.7450125866!2d115.850401!3d-31.8845012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32adea3a89a05f%3A0x6f9b8c0a8c0a8c0a!2sLittle+Nolla+Cafe!5e0!3m2!1sen!2sau!4v1714300000000!5m2!1sen!2sau" 
                className="w-full h-full border-0 grayscale contrast-125 opacity-90"
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none bg-espresso/10 mix-blend-overlay" />
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Locate Nolla</span>
              <h2 className="text-6xl font-serif font-bold text-espresso mb-10 leading-none">Find Your <br /><span className="italic text-gold">Seat.</span></h2>
              
              <div className="space-y-12 mb-16">
                <div className="group cursor-pointer">
                  <h5 className="font-bold text-xs uppercase tracking-widest text-gold mb-3">Address</h5>
                  <p className="text-2xl font-serif text-espresso group-hover:translate-x-2 transition-transform duration-500 underline underline-offset-8 decoration-gold/20">
                    80 Hillsborough Dr, <br />Nollamara WA 6061
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                   <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-gold mb-3">Weekdays</h5>
                    <p className="text-espresso font-medium">6:00am — 4:00pm</p>
                  </div>
                   <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-gold mb-3">Weekends</h5>
                    <p className="text-espresso font-medium">Sat 6am / Sun 7am Start</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={GOOGLE_MAPS_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-espresso text-cream font-bold rounded-full hover:bg-espresso-light transition-all flex items-center justify-center gap-3 shadow-xl shadow-espresso/20"
                >
                  Open in Google Maps <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso pt-32 pb-16 text-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="font-serif text-5xl md:text-7xl font-bold text-cream tracking-tight mb-16 opacity-20 select-none">
            Little Nolla Cafe
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 mb-24 text-left border-t border-cream/10 pt-16">
            <div className="col-span-1 md:col-span-2">
              <div className="font-serif text-2xl font-bold text-cream mb-6">Little <span className="text-gold">Nolla</span></div>
              <p className="text-cream/50 max-w-sm text-sm leading-relaxed mb-8 italic">
                "Not just coffee, but a boutique morning experience crafted specifically for our Nollamara community."
              </p>
              <div className="flex gap-4">
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-espresso transition-all"
                >
                   <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={FACEBOOK_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-espresso transition-all"
                >
                   <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h6 className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Quick Links</h6>
              <ul className="space-y-4 text-sm text-cream/70 underline-offset-4 decoration-gold/0 hover:decoration-gold transition-all">
                <li><a href="#why" className="hover:text-gold transition-colors">Why Nolla</a></li>
                <li><a href="#story" className="hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#menu" className="hover:text-gold transition-colors">Boutique Menu</a></li>
                <li><a href="#find-us" className="hover:text-gold transition-colors">Find Your Seat</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Connect</h6>
              <ul className="space-y-4 text-sm text-cream/70">
                <li><a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-2">Google Maps <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Write a Review</a></li>
                <li><span className="text-cream/30">Nollamara WA 6061</span></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-cream/5 gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-cream/30">
            <p>&copy; {new Date().getFullYear()} Little Nolla Cafe. Crafted with Soul in WA.</p>
            <div className="flex items-center gap-10">
               <a href="#" className="hover:text-gold transition-colors">Privacy</a>
               <a href="#" className="hover:text-gold transition-colors">Terms</a>
               <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Verified Local Guide Favourite</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


