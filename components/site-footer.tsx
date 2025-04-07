import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Acerca de */}
          <div>
            <h3 className="text-xl font-bold mb-4">Laboratorio Catch</h3>
            <p className="text-blue-100 mb-4">
              Especialistas en ropa de trabajo y prendas personalizadas para empresas, negocios y emprendimientos.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nuestros Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categoria/uniformes-corporativos"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Uniformes Corporativos
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/remeras-personalizadas"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Remeras Personalizadas
                </Link>
              </li>
              <li>
                <Link href="/categoria/buzos-camperas" className="text-blue-100 hover:text-white transition-colors">
                  Buzos y Camperas
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/accesorios-corporativos"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Accesorios Corporativos
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/uniformes-corporativos"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Ropa de Seguridad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Estampado Digital
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Bordado Computarizado
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Sublimación
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Diseño Personalizado
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Pedidos Mayoristas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-200 mr-2 mt-0.5" />
                <span className="text-blue-100">Av. Industrial 1234, Córdoba</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-200 mr-2" />
                <span className="text-blue-100">+54 351 734 0111</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-200 mr-2" />
                <span className="text-blue-100">infolaboratoriocatch.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Laboratorio Catch. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

