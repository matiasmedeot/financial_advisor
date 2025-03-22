import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Expertos en Asesoría<br />
              <span className="text-blue-600">Financiera</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Optimiza tus finanzas y alcanza tus metas con nuestro equipo de asesores expertos
            </p>
            <Link 
              href="/wizard"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Comenzar Asesoría
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src="/financial-advisor.webp"
              alt="Financial Advisor"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Planificación Financiera",
                description: "Desarrollamos estrategias personalizadas para alcanzar tus objetivos financieros",
                icon: "📊"
              },
              {
                title: "Inversiones",
                description: "Asesoramiento experto en diversificación de portafolio y gestión de riesgos",
                icon: "📈"
              },
              {
                title: "Jubilación",
                description: "Planificación para asegurar tu futuro financiero y el de tu familia",
                icon: "🎯"
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Facebook</a>
          </div>
          <p> 2025 Tu Asesor Financiero. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
