import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Dados do menu
  useEffect(() => {
    const pizzaData = [
      { 
        id: 1, 
        name: "Margherita", 
        description: "Molho de tomate, mussarela, manjericão fresco", 
        price: 25.90, 
        category: "tradicionais",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop"
      },
      { 
        id: 2, 
        name: "Pepperoni", 
        description: "Molho de tomate, mussarela, pepperoni fatiado", 
        price: 29.90, 
        category: "tradicionais",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
      },
      { 
        id: 3, 
        name: "Quatro Queijos", 
        description: "Mussarela, gorgonzola, parmesão, provolone", 
        price: 32.90, 
        category: "especiais",
        image: "https://images.unsplash.com/photo-1552539618-7eec9f4e1556?w=400&h=300&fit=crop"
      },
      { 
        id: 4, 
        name: "Calabresa", 
        description: "Molho de tomate, mussarela, calabresa fatiada, cebola", 
        price: 27.90, 
        category: "tradicionais",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
      },
      { 
        id: 5, 
        name: "Frango com Catupiry", 
        description: "Molho de tomate, mussarela, frango desfiado, catupiry", 
        price: 30.90, 
        category: "especiais",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
      },
      { 
        id: 6, 
        name: "Portuguesa", 
        description: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas", 
        price: 31.90, 
        category: "tradicionais",
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&h=300&fit=crop"
      },
      { 
        id: 7, 
        name: "Vegetariana", 
        description: "Molho de tomate, mussarela, pimentões, cogumelos, azeitonas, milho", 
        price: 28.90, 
        category: "vegetarianas",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
      },
      { 
        id: 8, 
        name: "Doce de Leite com Banana", 
        description: "Doce de leite, banana caramelizada, canela", 
        price: 34.90, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop"
      }
    ];
    
    setMenuItems(pizzaData);
  }, []);

  // Adicionar item ao carrinho
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    const updatedCart = cart
      .map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
      .filter(item => item.quantity > 0);
    
    setCart(updatedCart);
  };

  // Calcular total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Finalizar pedido
  const placeOrder = () => {
    if (cart.length === 0) return;
    
    setOrderSuccess(true);
    setCart([]);
    
    // Resetar mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setOrderSuccess(false);
    }, 5000);
  };

  // Filtrar itens por categoria
  const filteredItems = activeCategory === 'todos' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>🍕 Pizzaria React</h1>
            <p>A melhor pizza da cidade, feita com ingredientes frescos!</p>
          </div>
          <div className="contact-info">
            <p>📞 (48) 9804-9376</p>
            <p>🕒 Aberto todos os dias das 18h às 23h</p>
          </div>
        </div>
      </header>

      <main className="container main-content">
        {/* Mensagem de pedido realizado */}
        {orderSuccess && (
          <div className="order-success">
            <p>✅ Pedido realizado com sucesso! Sua pizza estará pronta em 30 minutos.</p>
          </div>
        )}

        <div className="content-wrapper">
          {/* Seção de menu */}
          <section className="menu-section">
            <h2>Nosso Menu</h2>
            
            {/* Filtros de categoria */}
            <div className="category-filter">
              <button 
                className={activeCategory === 'todos' ? 'active' : ''}
                onClick={() => setActiveCategory('todos')}
              >
                Todas
              </button>
              <button 
                className={activeCategory === 'tradicionais' ? 'active' : ''}
                onClick={() => setActiveCategory('tradicionais')}
              >
                Tradicionais
              </button>
              <button 
                className={activeCategory === 'especiais' ? 'active' : ''}
                onClick={() => setActiveCategory('especiais')}
              >
                Especiais
              </button>
              <button 
                className={activeCategory === 'vegetarianas' ? 'active' : ''}
                onClick={() => setActiveCategory('vegetarianas')}
              >
                Vegetarianas
              </button>
              <button 
                className={activeCategory === 'doces' ? 'active' : ''}
                onClick={() => setActiveCategory('doces')}
              >
                Doces
              </button>
            </div>

            {/* Lista de pizzas */}
            <div className="pizza-grid">
              {filteredItems.map(pizza => (
                <div className="pizza-card" key={pizza.id}>
                  <div className="pizza-image">
                    <img src={pizza.image} alt={pizza.name} />
                  </div>
                  <div className="pizza-info">
                    <h3>{pizza.name}</h3>
                    <p className="pizza-description">{pizza.description}</p>
                    <div className="pizza-footer">
                      <span className="pizza-price">R$ {pizza.price.toFixed(2)}</span>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(pizza)}
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Carrinho de compras */}
          <aside className="cart-sidebar">
            <h2>🛒 Seu Carrinho</h2>
            
            {cart.length === 0 ? (
              <p className="empty-cart">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-total">
                  <h3>Total: <span>R$ {calculateTotal().toFixed(2)}</span></h3>
                </div>
                
                <button 
                  className="order-btn"
                  onClick={placeOrder}
                >
                  Finalizar Pedido
                </button>
              </>
            )}
            
            {/* Informações de entrega */}
            <div className="delivery-info">
              <h3>🚚 Entrega em 30 minutos</h3>
              <p>Taxa de entrega: R$ 5,00</p>
              <p>Pedido mínimo: R$ 25,00</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-section">
            <h3>Pizzaria React</h3>
            <p>Rua das Pizzas, 123 - Centro</p>
            <p>Palhoça, SC</p>
          </div>
          <div className="footer-section">
            <h3>Horário de Funcionamento</h3>
            <p>Terça a Domingo: 18h às 23h</p>
            <p>Segunda: Fechado</p>
          </div>
          <div className="footer-section">
            <h3>Formas de Pagamento</h3>
            <p>Cartão de crédito/débito</p>
            <p>Dinheiro</p>
            <p>PIX</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;