import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, MessageSquare, Zap, 
  ArrowRight, Menu, X, Smartphone, Layers, 
  Monitor, Shield
} from 'lucide-react';

// --- Configuración ---
const WHATSAPP_NUMBER = "525514677308";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const LOGO_FILE = "PHOTO-2025-11-12-00-01-39.jpg";

// --- Cursor Personalizado (Efecto Glow) ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* Puntero principal */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      {/* Halo de luz seguidor */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none z-0 hidden md:block"
        animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
    </>
  );
};

// --- Navbar Flotante ---
const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
           <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors">
             <img 
               src={LOGO_FILE} 
               alt="DALGUX Logo" 
               className="w-full h-full object-contain bg-black"
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-teal-600 to-purple-900 flex items-center justify-center text-white font-bold">D</div>';
               }}
             />
          </div>
          <span className="text-xl font-bold text-white tracking-wider">
            DALGUX<span className="text-purple-500">.</span>DEVS
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Servicios', 'Proceso', 'Proyectos'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
          <a 
            href={WHATSAPP_URL}
            className="px-6 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-purple-400 transition-colors"
          >
            Cotizar Proyecto
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {['Servicios', 'Proceso', 'Proyectos'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-xl text-white font-bold">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Section con Grid Animado ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
        backgroundSize: '50px 50px' 
      }}></div>
      
      {/* Spotlight Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">System.Init(2025)</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8 tracking-tight">
            EL FUTURO ES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 animate-text-shimmer bg-[length:200%_auto]">
              SOFTWARE
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            En DALGUX Devs no escribimos código, arquitectamos soluciones. 
            Sistemas ERP, Apps y Webs diseñadas para dominar tu mercado.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href={WHATSAPP_URL} className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Iniciar Transformación <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
            <a href="#projects" className="text-white hover:text-purple-400 transition-colors font-medium underline-offset-4 hover:underline">
              Ver Casos de Éxito
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Code Elements Parallax */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-[10%] opacity-20 hidden lg:block">
        <Code2 size={64} className="text-teal-500" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-[10%] opacity-20 hidden lg:block">
        <Database size={64} className="text-purple-500" />
      </motion.div>
    </section>
  );
};

// --- Servicios "Glass Cards" ---
const Services = () => {
  const services = [
    { icon: Monitor, title: "Desarrollo Web", desc: "Sitios inmersivos y ultrarrápidos.", color: "text-blue-400" },
    { icon: Layers, title: "Sistemas ERP", desc: "Control total de tu operación.", color: "text-purple-400" },
    { icon: Smartphone, title: "Apps Móviles", desc: "Experiencias nativas iOS/Android.", color: "text-teal-400" },
    { icon: MessageSquare, title: "Chatbots IA", desc: "Automatización inteligente 24/7.", color: "text-pink-400" },
    { icon: Zap, title: "Optimización", desc: "Refactorización de sistemas legados.", color: "text-yellow-400" },
    { icon: Shield, title: "Ciberseguridad", desc: "Protección de datos empresariales.", color: "text-green-400" },
  ];

  return (
    <section id="services" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Arsenal Tecnológico</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-teal-500"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="group p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all"
            >
              <s.icon size={40} className={`mb-6 ${s.color} group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Proceso Vertical ---
const Process = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Decodificamos tus necesidades reales." },
    { num: "02", title: "Architecture", desc: "Diseñamos la estructura escalable." },
    { num: "03", title: "Development", desc: "Código limpio, sprints ágiles." },
    { num: "04", title: "Deploy", desc: "Lanzamiento y monitoreo continuo." },
  ];

  return (
    <section id="process" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Orden en el <br />
            <span className="text-zinc-600">Caos Digital.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Nuestro método elimina la incertidumbre. Transformamos ideas complejas en software funcional y elegante.
          </p>
          <a href={WHATSAPP_URL} className="text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors">
            Conocer metodología en detalle
          </a>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 bg-black border border-zinc-800 rounded-xl hover:border-purple-500/30 transition-colors group"
            >
              <span className="text-4xl font-mono font-bold text-zinc-800 group-hover:text-purple-500 transition-colors">{step.num}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-zinc-500 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Proyectos (Casos de Éxito) ---
const Projects = () => {
  const projects = [
    { title: "ERP Logístico Global", cat: "Sistemas", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { title: "Fintech Dashboard", cat: "Banca", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
    { title: "Next-Gen Commerce", cat: "Retail", img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section id="projects" className="py-32 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
             <h2 className="text-4xl font-bold text-white mb-2">Casos de Éxito</h2>
             <p className="text-zinc-500">Innovación que genera resultados.</p>
          </div>
          <a href={WHATSAPP_URL} className="text-purple-500 font-bold hover:text-purple-400 flex items-center gap-2">
            Ver todo <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-900 border border-white/5 cursor-pointer"
            >
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-purple-500 text-xs font-bold uppercase tracking-wider mb-2">{p.cat}</p>
                <h3 className="text-2xl font-bold text-white">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer Minimalista ---
const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold text-white mb-2">DALGUX DEVS</h4>
          <p className="text-zinc-500 text-sm">Ingeniería de Software Premium.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">Instagram</a>
          <a href={WHATSAPP_URL} className="text-zinc-500 hover:text-white transition-colors">WhatsApp</a>
        </div>
      </div>
      <div className="text-center mt-12 text-zinc-800 text-xs font-mono">
        SYSTEM STATUS: ONLINE • V3.0.1
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-purple-500 selection:text-black font-sans antialiased">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;