import { useEffect, useState } from "react";
import "./App.css";

const whatsappNumber = "5581999791816";
const apiUrl = `${import.meta.env.VITE_API_URL}/api/public/products/jc-modas-fitness`;

const categories = [
  {
    name: "Leggings",
    image: "/images/leggings.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver os leggings disponíveis.",
  },
  {
    name: "Tops",
    image: "/images/tops.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver os tops disponíveis.",
  },
  {
    name: "Shorts",
    image: "/images/shorts.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver os shorts disponíveis.",
  },
  {
    name: "Macaquinhos",
    image: "/images/macaquinhos.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver os macaquinhos disponíveis.",
  },
  {
    name: "Conjuntos",
    image: "/images/conjuntos.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver os conjuntos disponíveis.",
  },
  {
    name: "Jaquetas",
    image: "/images/jaquetas.png",
    message: "Olá! Vim através do site da JC Modas Fitness e quero ver as jaquetas disponíveis.",
  },
];

const normalizeCategory = (category) => String(category ?? "").trim().replace(/\s+/g, " ").toLowerCase();

const getProductImage = (image) => {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${import.meta.env.VITE_API_URL}${image}`;
};

function App() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Não foi possível carregar os produtos.");

        const data = await response.json();
        const productsFromApi = Array.isArray(data) ? data : data.products;
        setProducts(Array.isArray(productsFromApi) ? productsFromApi : []);
      } catch (error) {
        if (error.name !== "AbortError") setProductsError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoadingProducts(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  const openWhatsApp = (product = "", customMessage = "") => {
    const message = customMessage || (product
      ? `Olá! Vim pelo site da JC Modas Fitness e quero saber mais sobre o produto: ${product}.`
      : "Olá! Vim pelo site da JC Modas Fitness e gostaria de mais informações.");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    document.getElementById("produtos")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const visibleProducts = selectedCategory
    ? products.filter((product) => normalizeCategory(product.category) === normalizeCategory(selectedCategory))
    : products;

  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  const selectProductImage = (productId, imageIndex) => {
    setActiveImageIndexes((currentIndexes) => ({
      ...currentIndexes,
      [productId]: imageIndex,
    }));
  };

  return (
    <div className="site">

      {/* TOP BAR */}
      <div className="topbar">
        <span>✨ Moda Fitness que transforma sua rotina</span>
        <span>🚚 Enviamos para todo o Brasil</span>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img
            src="/images/logo-jc-modas-fitness.png"
            alt="JC Modas Fitness"
            className="brand-logo"
          />
        </div>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#categorias">Categorias</a>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </nav>

        <button
          className="header-whatsapp"
          onClick={() => openWhatsApp()}
        >
          WhatsApp
        </button>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="hero-small">JC MODAS FITNESS</p>

            <h1>
              Seu corpo.
              <br />
              <span>Sua melhor versão.</span>
            </h1>

            <p className="hero-text">
              Roupas fitness que unem estilo, conforto e desempenho
              para acompanhar você em todos os seus treinos.
            </p>

            <div className="hero-buttons">
              <a href="#produtos" className="btn-primary">
                Ver coleção
              </a>

              <button
                className="btn-secondary"
                onClick={() => openWhatsApp()}
              >
                Falar pelo WhatsApp
              </button>
            </div>
          </div>

          <div className="hero-model">
            <img
              src="/images/fitness-jc-modas.png"
              alt="JC Modas Fitness"
              className="hero-image"
            />
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits">
          <div>
            <span>🚚</span>
            <div>
              <strong>Enviamos</strong>
              <small>Para todo o Brasil</small>
            </div>
          </div>

          <div>
            <span>💳</span>
            <div>
              <strong>Pagamento</strong>
              <small>Diversas formas</small>
            </div>
          </div>

          <div>
            <span>🛡️</span>
            <div>
              <strong>Compra segura</strong>
              <small>Atendimento confiável</small>
            </div>
          </div>

          <div>
            <span>💬</span>
            <div>
              <strong>WhatsApp</strong>
              <small>Atendimento rápido</small>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section" id="categorias">
          <div className="section-title">
            <span>NAVEGUE</span>
            <h2>Nossas categorias</h2>
          </div>

          <div className="categories">
            {categories.map((category) => (
              <button
                type="button"
                className="category-card"
                key={category.name}
                onClick={() => selectCategory(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <h3>{category.name}</h3>
                <span>Ver produtos →</span>
              </button>
            ))}
          </div>
        </section>

        {/* PROMO */}
        <section className="promo">
          <div>
            <span>DESTAQUE</span>
            <h2>Conjuntos Fitness</h2>
            <p>
              Beleza, conforto e liberdade para todos os seus movimentos.
            </p>

            <a href="#produtos" className="btn-primary">
              Ver conjuntos
            </a>
          </div>

          <img
            src="/images/banner-colecao-jc-modas.png"
            alt="Coleção JC Modas Fitness"
            className="promo-image"
          />
        </section>

        {/* PRODUCTS */}
        <section className="section" id="produtos">
          <div className="products-heading">
            <div className="section-title">
              <span>ESCOLHA SEU LOOK</span>
              <h2>Produtos em destaque</h2>
            </div>

            <div className="products-filter" aria-live="polite">
              <span>
                {selectedCategory ? `Categoria: ${selectedCategory}` : "Todas as categorias"}
              </span>
              {selectedCategory && (
                <button type="button" onClick={() => setSelectedCategory("")}>
                  Ver todos
                </button>
              )}
            </div>
          </div>

          {isLoadingProducts && (
            <p className="products-message" role="status">Carregando produtos...</p>
          )}

          {!isLoadingProducts && productsError && (
            <p className="products-message products-message-error" role="alert">
              Não foi possível carregar o catálogo agora. Tente novamente em instantes.
            </p>
          )}

          {!isLoadingProducts && !productsError && products.length === 0 && (
            <p className="products-message" role="status">
              Nosso catálogo está sendo atualizado. Em breve teremos novidades para você.
            </p>
          )}

          {!isLoadingProducts && !productsError && products.length > 0 && visibleProducts.length === 0 && (
            <p className="products-message" role="status">
              Ainda não há produtos publicados na categoria {selectedCategory}.
            </p>
          )}

          {!isLoadingProducts && !productsError && visibleProducts.length > 0 && (
            <div className="products">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product._id}>
                  {(() => {
                    const productImages = Array.isArray(product.images)
                      ? product.images.filter(Boolean)
                      : [];
                    const productId = product._id ?? product.name;
                    const activeImageIndex = Math.min(
                      activeImageIndexes[productId] ?? 0,
                      Math.max(productImages.length - 1, 0)
                    );
                    const activeImage = productImages[activeImageIndex];

                    return (
                      <div className="product-gallery">
                        <div className="product-image">
                          {activeImage && (
                            <img src={getProductImage(activeImage)} alt={product.name} />
                          )}
                          {product.featured && <span className="badge">DESTAQUE</span>}
                        </div>

                        {productImages.length > 1 && (
                          <div className="product-thumbnails" aria-label={`Imagens de ${product.name}`}>
                            {productImages.map((image, imageIndex) => (
                              imageIndex !== activeImageIndex && (
                                <button
                                  type="button"
                                  className="product-thumbnail"
                                  key={`${productId}-${imageIndex}`}
                                  onClick={() => selectProductImage(productId, imageIndex)}
                                  aria-label={`Ver imagem ${imageIndex + 1} de ${product.name}`}
                                >
                                  <img src={getProductImage(image)} alt="" />
                                </button>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    {product.category && <span className="product-category">{product.category}</span>}
                    {product.price !== "" && product.price != null && (
                      <strong>{product.price}</strong>
                    )}

                    <button
                      onClick={() => openWhatsApp(product.name)}
                      className="product-button"
                    >
                      Comprar pelo WhatsApp
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="about" id="sobre">
          <div>
            <span>JC MODAS FITNESS</span>
            <h2>Mais que roupas.<br />Um estilo de vida.</h2>
          </div>

          <p>
            Nossa missão é oferecer peças fitness bonitas, confortáveis
            e de qualidade para você treinar com confiança e estilo.
          </p>
        </section>

        {/* CATALOG CTA */}
        <section className="catalog-cta">
          <h2>VEJA NOSSO CATÁLOGO COMPLETO</h2>
          <p>
            Temos muito mais opções de roupas fitness, modelos, cores e estampas.
          </p>
          <p>
            Chame a gente pelo WhatsApp e receba nosso catálogo completo.
          </p>

          <button
            className="catalog-cta-button"
            onClick={() => openWhatsApp(
              "",
              "Olá! Vim pelo site da JC Modas Fitness e gostaria de receber o catálogo completo."
            )}
          >
            Ver catálogo pelo WhatsApp
          </button>

          <p className="catalog-cta-note">
            Atendimento rápido • Enviamos para todo o Brasil
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contato">
        <div>
          <div className="footer-logo">JC <span>MODAS FITNESS</span></div>
          <p>Conforto • Estilo • Qualidade</p>
        </div>

        <div className="footer-actions">
          <a
            className="footer-instagram"
            href="https://www.instagram.com/jc_modas_fitness/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visitar Instagram da JC Modas Fitness"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" className="instagram-dot" />
            </svg>
            Instagram
          </a>

          <button
            className="footer-whatsapp"
            onClick={() => openWhatsApp()}
            aria-label="Falar conosco pelo WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 3.5A11.84 11.84 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.45-8.39ZM12.09 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.84 9.84 0 0 1-1.5-5.19C2.21 6.43 6.64 2 12.09 2c2.64 0 5.12 1.03 6.98 2.9a9.79 9.79 0 0 1 2.89 6.99c0 5.45-4.43 9.81-9.87 9.81Zm5.39-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47s1.06 2.87 1.21 3.07c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.42.25-.69.25-1.29.17-1.42-.08-.12-.27-.2-.57-.35Z" />
            </svg>
            WhatsApp
          </button>
        </div>

        <p className="copyright">
          © 2026 JC Modas Fitness. Todos os direitos reservados.
        </p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <button
        className="floating-whatsapp"
        onClick={() => openWhatsApp()}
        aria-label="Abrir WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 3.5A11.84 11.84 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.45-8.39ZM12.09 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.84 9.84 0 0 1-1.5-5.19C2.21 6.43 6.64 2 12.09 2c2.64 0 5.12 1.03 6.98 2.9a9.79 9.79 0 0 1 2.89 6.99c0 5.45-4.43 9.81-9.87 9.81Zm5.39-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47s1.06 2.87 1.21 3.07c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.42.25-.69.25-1.29.17-1.42-.08-.12-.27-.2-.57-.35Z" />
        </svg>
      </button>
    </div>
  );
}

export default App;