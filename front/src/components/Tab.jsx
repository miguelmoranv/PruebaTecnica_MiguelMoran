import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IonIcon } from "@ionic/react"
import {
  storefrontOutline,
  cartOutline,
  personCircleOutline,
} from "ionicons/icons"
import "../styles/Tab.css"
import { useCart } from "../context/CartContext";

export function Tab() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("")
  const [userRole, setUserRole] = useState("usuario")
  const { cartItems } = useCart();
const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.rol) {
      setUserRole(user.rol)
    }
  }, [])

  const menuItems = [
    { id: "Catalogo", label: "Catálogo", icon: storefrontOutline, path: "/Catalogo", adminOnly: false },
    { id: "Carrito", label: "Carrito", icon: cartOutline, path: "/Carrito", adminOnly: true },
    { id: "Profile", label: "Perfil", icon: personCircleOutline, path: "/Perfil", adminOnly: false },
  ]

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.adminOnly) {
      return userRole === "user"
    }
    return true
  })

  useEffect(() => {
    const currentTab = filteredMenuItems.find((item) => item.path === location.pathname)
    if (currentTab) {
      setActiveTab(currentTab.id)
    }
  }, [location.pathname, filteredMenuItems])

  const handleTabClick = (item) => {
    setActiveTab(item.id)
    navigate(item.path)
  }

  return (
    <>
      <div className="bottom-menu-spacer"></div>

      <nav className="bottom-menu">
        {filteredMenuItems.map((item) => (
          <button
            key={item.id}
            className={`bottom-menu-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => handleTabClick(item)}
          >
           <IonIcon icon={item.icon} className="bottom-menu-icon" />
            {item.id === "Carrito" && totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
            )}

            <span className="bottom-menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
