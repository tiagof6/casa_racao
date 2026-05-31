/* ==========================================================================
   APP SCRIPT - THÉO DOG RAÇÕES
   ========================================================================== */

// Configuração Geral da Loja
const STORE_CONFIG = {
  whatsappNumber: "5512988887777", // Número da loja no formato DDI + DDD + Número (ex: 55 + 12 + 988887777)
  storeName: "THÉO DOG RAÇÕES",
  addressDefault: "Jacareí, SP"
};

// Banco de Dados de Produtos
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Ração Golden Formula Cães Adultos Frango & Arroz - 15kg",
    category: "cachorro",
    originalPrice: 169.90,
    price: 149.90,
    rating: 5,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    icon: "fa-solid fa-bone",
    color: "#ffc107" // Amarelo
  },
  {
    id: 2,
    name: "Ração Premier Pet Golden Gatos Adultos Castrados Salmão - 10.1kg",
    category: "gato",
    originalPrice: 179.90,
    price: 159.90,
    rating: 5,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    icon: "fa-solid fa-fish",
    color: "#20c997" // Verde-água
  },
  {
    id: 3,
    name: "Ração Royal Canin Golden Retriever Adulto - 12kg",
    category: "cachorro",
    originalPrice: 389.90,
    price: 349.90,
    rating: 5,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
    icon: "fa-solid fa-dog",
    color: "#0d6efd" // Azul
  },
  {
    id: 4,
    name: "Mistura Premium para Calopsita e Pássaros Silvestres Nutrópica - 500g",
    category: "passaros",
    originalPrice: 34.90,
    price: 29.90,
    rating: 4,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    icon: "fa-solid fa-dove",
    color: "#fd7e14" // Laranja
  },
  {
    id: 5,
    name: "Comedouro de Inox Antiderrapante para Pets - 900ml",
    category: "acessorios",
    originalPrice: 45.00,
    price: 35.00,
    rating: 5,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    icon: "fa-solid fa-circle-notch",
    color: "#6c757d" // Cinza
  },
  {
    id: 6,
    name: "Brinquedo Mordedor de Corda com Nó para Cães de Porte Médio",
    category: "acessorios",
    originalPrice: 28.00,
    price: 19.90,
    rating: 4,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
    icon: "fa-solid fa-baseball",
    color: "#e83e8c" // Rosa
  },
  {
    id: 7,
    name: "Coleira Peitoral Ajustável Premium Conforto Azul Théo",
    category: "acessorios",
    originalPrice: 79.90,
    price: 64.90,
    rating: 5,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    icon: "fa-solid fa-shield-heart",
    color: "#17a2b8" // Ciano
  },
  {
    id: 8,
    name: "Antipulgas e Carrapatos Simparic para Cães de 10 a 20kg (3 comprimidos)",
    category: "farmacia",
    originalPrice: 199.90,
    price: 174.90,
    rating: 5,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    icon: "fa-solid fa-pills",
    color: "#dc3545" // Vermelho
  },
  {
    id: 9,
    name: "Vermífugo Drontal Plus Sabor Carne para Cães de até 10kg - 4 Comprimidos",
    category: "farmacia",
    originalPrice: 69.90,
    price: 59.95,
    rating: 4,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    icon: "fa-solid fa-prescription-bottle",
    color: "#6f42c1" // Roxo
  },
  {
    id: 10,
    name: "Petisco Snack Golden Cookie Cães Adultos Raças Pequenas - 350g",
    category: "cachorro",
    originalPrice: 22.00,
    price: 16.90,
    rating: 5,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    icon: "fa-solid fa-cookie",
    color: "#ffc107" // Amarelo
  },
  {
    id: 11,
    name: "Ração GranPlus Gourmet Ovelha & Arroz Gatos Castrados - 3kg",
    category: "gato",
    originalPrice: 72.90,
    price: 62.90,
    rating: 4,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    icon: "fa-solid fa-cat",
    color: "#20c997" // Verde-água
  },
  {
    id: 12,
    name: "Ração Seca Nutrópica Trinca Ferro Natural - 5kg",
    category: "passaros",
    originalPrice: 145.00,
    price: 129.90,
    rating: 5,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    icon: "fa-solid fa-dove",
    color: "#fd7e14" // Laranja
  }
];

// Estado Geral da Aplicação
let cart = [];
let currentUser = null;
let currentCategory = "todos";
let currentSearchQuery = "";
let currentSort = "default";

// Seletores do DOM
const elements = {
  productsGrid: document.getElementById("productsGrid"),
  noResultsMessage: document.getElementById("noResultsMessage"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn"),
  catalogTitle: document.getElementById("catalogTitle"),
  catalogSubtitle: document.getElementById("catalogSubtitle"),
  
  // Categorias
  categoryCards: document.querySelectorAll(".category-card"),
  sortSelect: document.getElementById("sortSelect"),
  
  // Busca
  searchInput: document.getElementById("searchInput"),
  quickSearchResults: document.getElementById("quickSearchResults"),
  
  // Carrinho Drawer
  cartTriggerBtn: document.getElementById("cartTriggerBtn"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartDrawerOverlay: document.getElementById("cartDrawerOverlay"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartEmptyState: document.getElementById("cartEmptyState"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartDrawerFooter: document.getElementById("cartDrawerFooter"),
  btnBackToShop: document.getElementById("btnBackToShop"),
  
  // Valores do Carrinho
  cartCounter: document.getElementById("cartCounter"),
  cartTotalValHeader: document.getElementById("cartTotalValHeader"),
  cartSubtotalVal: document.getElementById("cartSubtotalVal"),
  cartDiscountRow: document.getElementById("cartDiscountRow"),
  cartDiscountVal: document.getElementById("cartDiscountVal"),
  cartTotalVal: document.getElementById("cartTotalVal"),
  
  // Formulário de Entrega
  cartDeliveryAddress: document.getElementById("cartDeliveryAddress"),
  cartPaymentMethod: document.getElementById("cartPaymentMethod"),
  cartNotes: document.getElementById("cartNotes"),
  btnCheckoutWhatsApp: document.getElementById("btnCheckoutWhatsApp"),
  
  // Autenticação Modal
  authModalOverlay: document.getElementById("authModalOverlay"),
  closeAuthModalBtn: document.getElementById("closeAuthModalBtn"),
  tabLoginBtn: document.getElementById("tabLoginBtn"),
  tabRegisterBtn: document.getElementById("tabRegisterBtn"),
  loginFormContainer: document.getElementById("loginFormContainer"),
  registerFormContainer: document.getElementById("registerFormContainer"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  
  // Dropdown e Boas-Vindas
  userMenuBtn: document.getElementById("userMenuBtn"),
  userWelcomeText: document.getElementById("userWelcomeText"),
  userActionPrompt: document.getElementById("userActionPrompt"),
  loggedUserName: document.getElementById("loggedUserName"),
  loggedUserPet: document.getElementById("loggedUserPet"),
  dropdownLoggedOut: document.getElementById("dropdownLoggedOut"),
  dropdownLoggedIn: document.getElementById("dropdownLoggedIn"),
  dropdownLoginBtn: document.getElementById("dropdownLoginBtn"),
  dropdownRegisterBtn: document.getElementById("dropdownRegisterBtn"),
  dropdownLogoutBtn: document.getElementById("dropdownLogoutBtn"),
  btnAppDownloadRedirect: document.getElementById("btnAppDownloadRedirect"),
  footerLinkRegister: document.getElementById("footerLinkRegister"),
  ctaRegisterBtn: document.getElementById("ctaRegisterBtn"),
  
  // Download do Aplicativo Modal
  appModalOverlay: document.getElementById("appModalOverlay"),
  closeAppModalBtn: document.getElementById("closeAppModalBtn"),
  appInstallLoading: document.getElementById("appInstallLoading"),
  appInstallSuccess: document.getElementById("appInstallSuccess"),
  progressBarFill: document.getElementById("progressBarFill"),
  progressPctText: document.getElementById("progressPctText"),
  btnDismissAppModal: document.getElementById("btnDismissAppModal"),
  heroCtaApp: document.getElementById("heroCtaApp"),
  btnDownloadAndroid: document.getElementById("btnDownloadAndroid"),
  btnDownloadIos: document.getElementById("btnDownloadIos"),
  installModalTitle: document.getElementById("installModalTitle")
};

// ==========================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Carrega carrinho salvo (se houver)
  const savedCart = localStorage.getItem("theo_dog_cart");
  if (savedCart) {
    try { cart = JSON.parse(savedCart); } catch (e) { cart = []; }
  }
  
  // Carrega usuário logado salvo
  const savedUser = localStorage.getItem("theo_dog_current_user");
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateUserUI();
    } catch (e) {
      currentUser = null;
    }
  }

  // Inicializa a exibição de produtos
  renderCatalog();
  updateCartUI();
  setupEventListeners();
});

// ==========================================================================
// RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
// ==========================================================================

function renderCatalog() {
  // 1. Filtrar produtos por Categoria
  let filteredProducts = PRODUCTS_DB.filter(product => {
    if (currentCategory === "todos") return true;
    return product.category === currentCategory;
  });

  // 2. Filtrar produtos por Busca
  if (currentSearchQuery.trim() !== "") {
    const query = currentSearchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(query) || 
             product.category.toLowerCase().includes(query);
    });
  }

  // 3. Ordenar produtos
  if (currentSort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // default/relevância: Destaques primeiro
    filteredProducts.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }

  // Atualizar contagem no título do catálogo
  updateCatalogTitles(filteredProducts.length);

  // Limpar grid
  elements.productsGrid.innerHTML = "";

  // Se nenhum resultado
  if (filteredProducts.length === 0) {
    elements.productsGrid.classList.add("hidden");
    elements.noResultsMessage.classList.remove("hidden");
    return;
  }

  elements.productsGrid.classList.remove("hidden");
  elements.noResultsMessage.classList.add("hidden");

  // Inserir os cards de produtos
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", product.id);

    // Calcular porcentagem de desconto
    const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    // Gerar badges de promoção
    let badgesHtml = "";
    if (discountPct > 0) {
      badgesHtml += `<span class="prod-badge prod-badge-discount">${discountPct}% OFF</span>`;
    }
    if (product.isBestSeller) {
      badgesHtml += `<span class="prod-badge prod-badge-featured">Mais Vendido</span>`;
    } else if (product.isNew) {
      badgesHtml += `<span class="prod-badge prod-badge-featured" style="background-color: var(--success)">Novo</span>`;
    }

    // Criar uma representação visual elegante em SVG baseada na categoria do produto
    const svgIcon = `<i class="${product.icon} product-placeholder-icon" style="color: ${product.color}"></i>`;

    // Desenhar estrelas
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        starsHtml += `<i class="fa-solid fa-star"></i>`;
      } else {
        starsHtml += `<i class="fa-regular fa-star"></i>`;
      }
    }

    // Preço Pix (10% OFF do preço final)
    const pixPrice = (product.price * 0.9).toFixed(2);

    card.innerHTML = `
      <div class="product-badges">${badgesHtml}</div>
      <div class="product-img-wrapper">
        <div class="product-category-graphic" style="background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,245,249,0.5) 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          ${svgIcon}
        </div>
      </div>
      <span class="product-category">${product.category}</span>
      <h3 class="product-name" title="${product.name}">${product.name}</h3>
      <div class="product-rating">${starsHtml}</div>
      
      <div class="product-price-wrapper">
        ${product.originalPrice > product.price ? `<span class="product-old-price">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : '<span class="product-old-price" style="visibility:hidden">R$ 0,00</span>'}
        <span class="product-current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
        <span class="product-pix-price"><i class="fa-brands fa-pix"></i> R$ ${pixPrice.replace('.', ',')} no Pix</span>
      </div>
      
      <button class="btn btn-add-to-cart" onclick="addToCart(${product.id})">
        <i class="fa-solid fa-cart-plus"></i> Adicionar à Sacola
      </button>
    `;

    elements.productsGrid.appendChild(card);
  });
}

function updateCatalogTitles(count) {
  let title = "Todos os Produtos";
  let subtitle = "Explore a variedade completa do nosso estoque.";

  if (currentSearchQuery.trim() !== "") {
    title = `Resultados para "${currentSearchQuery}"`;
    subtitle = `${count} produto(s) encontrado(s).`;
  } else {
    switch (currentCategory) {
      case "cachorro":
        title = "Rações & Mimos para Cães";
        subtitle = "As melhores marcas de rações secas, úmidas e biscoitos selecionados.";
        break;
      case "gato":
        title = "Nutrição & Diversão para Gatos";
        subtitle = "Alimentos especiais e areias higiênicas de alta qualidade.";
        break;
      case "passaros":
        title = "Alimentos para Pássaros";
        subtitle = "Sementes selecionadas e misturas completas para calopsitas, trinca-ferros e mais.";
        break;
      case "acessorios":
        title = "Acessórios & Brinquedos";
        subtitle = "Coleiras, potes de inox antiderrapantes e brinquedos para alegrar o dia.";
        break;
      case "farmacia":
        title = "Farmácia Veterinária";
        subtitle = "Antipulgas Simparic, vermífugos e medicamentos indicados por profissionais.";
        break;
    }
  }

  elements.catalogTitle.textContent = title;
  elements.catalogSubtitle.textContent = subtitle;
}

// ==========================================================================
// CONTROLE DO CARRINHO DE COMPRAS (SACOLA)
// ==========================================================================

// Função global para ser chamada pelo HTML dinâmico
window.addToCart = function(productId) {
  const product = PRODUCTS_DB.find(p => p.id === productId);
  if (!product) return;

  // Verifica se o item já está no carrinho
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      color: product.color,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  
  // Abrir carrinho para dar feedback visual
  openCartDrawer();
  
  // Feedback sutil no botão do cabeçalho (efeito de bounce)
  elements.cartTriggerBtn.style.animation = "none";
  setTimeout(() => {
    elements.cartTriggerBtn.style.animation = "bounceIn 0.3s ease";
  }, 10);
};

function saveCart() {
  localStorage.setItem("theo_dog_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  elements.cartCounter.textContent = totalItems;

  if (cart.length === 0) {
    elements.cartEmptyState.classList.remove("hidden");
    elements.cartItemsList.classList.add("hidden");
    elements.cartDrawerFooter.classList.add("hidden");
    elements.cartTotalValHeader.textContent = "R$ 0,00";
    return;
  }

  elements.cartEmptyState.classList.add("hidden");
  elements.cartItemsList.classList.remove("hidden");
  elements.cartDrawerFooter.classList.remove("hidden");

  // Limpa lista
  elements.cartItemsList.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";
    itemRow.innerHTML = `
      <div class="cart-item-img">
        <i class="${item.icon}" style="color: ${item.color}; font-size: 1.5rem;"></i>
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price-row">
          <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Diminuir quantidade"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Aumentar quantidade"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove-btn" onclick="removeItem(${item.id})" aria-label="Remover item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    elements.cartItemsList.appendChild(itemRow);
  });

  // Cálculo de desconto (10% se estiver cadastrado/logado)
  let discount = 0;
  if (currentUser) {
    discount = subtotal * 0.10;
    elements.cartDiscountRow.classList.remove("hidden");
    elements.cartDiscountVal.textContent = `- R$ ${discount.toFixed(2).replace('.', ',')}`;
  } else {
    elements.cartDiscountRow.classList.add("hidden");
  }

  const finalTotal = subtotal - discount;

  // Atualiza valores nas tags
  elements.cartTotalValHeader.textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
  elements.cartSubtotalVal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  elements.cartTotalVal.textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

window.changeQty = function(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  
  if (item.quantity <= 0) {
    removeItem(productId);
  } else {
    saveCart();
    updateCartUI();
  }
};

window.removeItem = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
};

function openCartDrawer() {
  elements.cartDrawer.classList.add("open");
  elements.cartDrawerOverlay.style.display = "block";
  setTimeout(() => {
    elements.cartDrawerOverlay.style.opacity = "1";
  }, 10);
  document.body.style.overflow = "hidden"; // Trava scroll da página
}

function closeCartDrawer() {
  elements.cartDrawer.classList.remove("open");
  elements.cartDrawerOverlay.style.opacity = "0";
  setTimeout(() => {
    elements.cartDrawerOverlay.style.display = "none";
  }, 300);
  document.body.style.overflow = ""; // Restaura scroll
}

// ==========================================================================
// CADASTRO E LOGIN DE USUÁRIOS
// ==========================================================================

function openAuthModal(tab = "login") {
  elements.authModalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  switchAuthTab(tab);
}

function closeAuthModal() {
  elements.authModalOverlay.style.display = "none";
  document.body.style.overflow = "";
}

function switchAuthTab(tab) {
  if (tab === "login") {
    elements.tabLoginBtn.classList.add("active");
    elements.tabRegisterBtn.classList.remove("active");
    elements.loginFormContainer.classList.remove("hidden");
    elements.registerFormContainer.classList.add("hidden");
  } else {
    elements.tabRegisterBtn.classList.add("active");
    elements.tabLoginBtn.classList.remove("active");
    elements.registerFormContainer.classList.remove("hidden");
    elements.loginFormContainer.classList.add("hidden");
  }
}

// Lógica de cadastro (Salvar no localStorage)
function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById("regName").value;
  const phone = document.getElementById("regPhone").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const petName = document.getElementById("regPetName").value;
  const petType = document.getElementById("regPetType").value;

  // Cria objeto do usuário
  const user = { name, phone, email, password, petName, petType };

  // Salva no banco de usuários mockado no localStorage
  let usersList = [];
  const savedUsers = localStorage.getItem("theo_dog_users");
  if (savedUsers) {
    try { usersList = JSON.parse(savedUsers); } catch (e) { usersList = []; }
  }

  // Verifica se o e-mail já existe
  if (usersList.some(u => u.email === email)) {
    alert("Este e-mail já está cadastrado!");
    return;
  }

  usersList.push(user);
  localStorage.setItem("theo_dog_users", JSON.stringify(usersList));

  // Autentica o usuário automaticamente
  currentUser = user;
  localStorage.setItem("theo_dog_current_user", JSON.stringify(user));

  // Sucesso
  alert(`Cadastro realizado com sucesso, ${name}! Seu pet ${petName} foi adicionado. Você ganhou 10% de desconto!`);
  
  updateUserUI();
  updateCartUI(); // Recalcula total com desconto
  closeAuthModal();
  elements.registerForm.reset();
}

// Lógica de Login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let usersList = [];
  const savedUsers = localStorage.getItem("theo_dog_users");
  if (savedUsers) {
    try { usersList = JSON.parse(savedUsers); } catch (e) { usersList = []; }
  }

  // Encontra usuário
  const user = usersList.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem("theo_dog_current_user", JSON.stringify(user));
    
    updateUserUI();
    updateCartUI(); // Atualiza desconto
    closeAuthModal();
    elements.loginForm.reset();
  } else {
    alert("E-mail ou senha incorretos.");
  }
}

// Logout
function handleLogout() {
  currentUser = null;
  localStorage.removeItem("theo_dog_current_user");
  updateUserUI();
  updateCartUI();
  alert("Você saiu da sua conta.");
}

// Atualiza a interface com dados do usuário
function updateUserUI() {
  if (currentUser) {
    // Ajustes no cabeçalho
    elements.userWelcomeText.textContent = `Olá, ${currentUser.name.split(' ')[0]}`;
    elements.userActionPrompt.textContent = `Meu Pet: ${currentUser.petName}`;
    
    // Ajustes no dropdown do usuário
    elements.loggedUserName.textContent = currentUser.name;
    elements.loggedUserPet.textContent = `${currentUser.petName} (${currentUser.petType})`;
    elements.dropdownLoggedOut.classList.add("hidden");
    elements.dropdownLoggedIn.classList.remove("hidden");
    
    // Auto-preenche endereço de entrega se houver histórico ou deixa padrão
    if (!elements.cartDeliveryAddress.value) {
      elements.cartDeliveryAddress.value = localStorage.getItem("theo_dog_delivery_address") || "";
    }
  } else {
    // Deslogado
    elements.userWelcomeText.textContent = "Entrar";
    elements.userActionPrompt.textContent = "Minha Conta";
    elements.dropdownLoggedOut.classList.remove("hidden");
    elements.dropdownLoggedIn.classList.add("hidden");
  }
}

// ==========================================================================
// SIMULAÇÃO DO DOWNLOAD DO APLICATIVO
// ==========================================================================

function triggerAppDownload(platform) {
  // Configura textos iniciais do modal
  elements.appInstallSuccess.classList.add("hidden");
  elements.appInstallLoading.classList.remove("hidden");
  elements.appModalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  
  if (platform === "android") {
    elements.installModalTitle.textContent = "Baixando para Android...";
  } else {
    elements.installModalTitle.textContent = "Configurando PWA para iPhone...";
  }

  // Animação de progresso
  let progress = 0;
  elements.progressBarFill.style.width = "0%";
  elements.progressPctText.textContent = "0%";
  
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Transiciona para a tela de Sucesso
      setTimeout(() => {
        elements.appInstallLoading.classList.add("hidden");
        elements.appInstallSuccess.classList.remove("hidden");
      }, 300);
    }
    
    elements.progressBarFill.style.width = `${progress}%`;
    elements.progressPctText.textContent = `${progress}%`;
  }, 150);
}

function closeAppModal() {
  elements.appModalOverlay.style.display = "none";
  document.body.style.overflow = "";
}

// ==========================================================================
// FINALIZAÇÃO DE COMPRA VIA WHATSAPP
// ==========================================================================

function handleWhatsAppCheckout() {
  if (cart.length === 0) {
    alert("Sua sacola está vazia!");
    return;
  }

  const address = elements.cartDeliveryAddress.value.trim();
  if (!address) {
    alert("Por favor, informe seu endereço completo para entrega.");
    elements.cartDeliveryAddress.focus();
    return;
  }

  // Salva endereço no localStorage para compras futuras
  localStorage.setItem("theo_dog_delivery_address", address);

  const payment = elements.cartPaymentMethod.value;
  const notes = elements.cartNotes.value.trim();

  // Constrói a mensagem
  let msg = `🐾 *PEDIDO - ${STORE_CONFIG.storeName}* 🐾\n`;
  msg += `----------------------------------\n`;
  msg += `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  msg += `*ITENS DO PEDIDO:*\n`;

  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    msg += `• *${item.quantity}x* ${item.name}\n`;
    msg += `   _Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')} | Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}_\n`;
  });

  msg += `\n*RESUMO FINANCEIRO:*\n`;
  msg += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;

  let discount = 0;
  if (currentUser) {
    discount = subtotal * 0.10;
    msg += `Desconto Especial de Cadastro (10%): - R$ ${discount.toFixed(2).replace('.', ',')}\n`;
  }

  const total = subtotal - discount;
  msg += `*TOTAL A PAGAR: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  
  if (payment === "Pix") {
    msg += `_(Garante mais 10% de desconto sobre produtos avulsos na entrega!)*_\n`;
  }

  msg += `\n----------------------------------\n`;
  msg += `*DADOS PARA ENTREGA:*\n`;
  if (currentUser) {
    msg += `• *Cliente:* ${currentUser.name}\n`;
    msg += `• *Telefone:* ${currentUser.phone}\n`;
    msg += `• *Pet do Cliente:* ${currentUser.petName} 🐶\n`;
  } else {
    msg += `• *Cliente:* Visitante do Site\n`;
  }
  msg += `• *Endereço:* ${address}\n`;
  msg += `• *Forma de Pagamento:* ${payment}\n`;
  
  if (notes) {
    msg += `• *Observações:* ${notes}\n`;
  }
  
  msg += `\n🐾 _O mascote Théo agradece sua preferência! Latidos de felicidade!_ 🐾`;

  // Encode URL
  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMsg}`;

  // Abre janela do WhatsApp
  window.open(waUrl, "_blank");

  // Limpa carrinho após finalizar
  cart = [];
  saveCart();
  updateCartUI();
  closeCartDrawer();
  
  alert("Pedido enviado! Você será redirecionado para o WhatsApp para confirmar o agendamento de entrega.");
}

// ==========================================================================
// CONFIGURAÇÃO DOS EVENTOS (EVENT LISTENERS)
// ==========================================================================

function setupEventListeners() {
  // Busca em tempo real
  elements.searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    renderCatalog();
    updateQuickSearch();
  });

  // Oculta resultados rápidos se clicar fora
  document.addEventListener("click", (e) => {
    if (!elements.searchInput.contains(e.target) && !elements.quickSearchResults.contains(e.target)) {
      elements.quickSearchResults.style.display = "none";
    }
  });

  // Filtros de Categoria
  elements.categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      // Remove active de todos
      elements.categoryCards.forEach(c => c.classList.remove("active"));
      // Adiciona no clicado
      card.classList.add("active");
      
      currentCategory = card.getAttribute("data-category");
      renderCatalog();
    });
  });

  // Ordenação
  elements.sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderCatalog();
  });

  // Limpar Filtros
  elements.clearFiltersBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    currentSearchQuery = "";
    currentCategory = "todos";
    
    elements.categoryCards.forEach(c => c.classList.remove("active"));
    document.getElementById("catBtnTodos").classList.add("active");
    
    renderCatalog();
  });

  // Acionadores do Carrinho
  elements.cartTriggerBtn.addEventListener("click", openCartDrawer);
  elements.closeCartBtn.addEventListener("click", closeCartDrawer);
  elements.cartDrawerOverlay.addEventListener("click", closeCartDrawer);
  elements.btnBackToShop.addEventListener("click", closeCartDrawer);

  // Acionadores de Autenticação (Modal)
  elements.dropdownLoginBtn.addEventListener("click", () => openAuthModal("login"));
  elements.dropdownRegisterBtn.addEventListener("click", () => openAuthModal("register"));
  elements.ctaRegisterBtn.addEventListener("click", () => openAuthModal("register"));
  elements.footerLinkRegister.addEventListener("click", (e) => {
    e.preventDefault();
    openAuthModal("register");
  });
  elements.dropdownLogoutBtn.addEventListener("click", handleLogout);
  
  elements.closeAuthModalBtn.addEventListener("click", closeAuthModal);
  elements.authModalOverlay.addEventListener("click", (e) => {
    if (e.target === elements.authModalOverlay) closeAuthModal();
  });

  // Switch de Tabs no Modal
  elements.tabLoginBtn.addEventListener("click", () => switchAuthTab("login"));
  elements.tabRegisterBtn.addEventListener("click", () => switchAuthTab("register"));

  // Submit dos Formulários
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.registerForm.addEventListener("submit", handleRegister);

  // Download do Aplicativo
  elements.heroCtaApp.addEventListener("click", () => triggerAppDownload("android"));
  elements.btnDownloadAndroid.addEventListener("click", () => triggerAppDownload("android"));
  elements.btnDownloadIos.addEventListener("click", () => triggerAppDownload("ios"));
  elements.btnAppDownloadRedirect.addEventListener("click", () => {
    triggerAppDownload("android");
  });
  
  elements.closeAppModalBtn.addEventListener("click", closeAppModal);
  elements.btnDismissAppModal.addEventListener("click", closeAppModal);
  elements.appModalOverlay.addEventListener("click", (e) => {
    if (e.target === elements.appModalOverlay) closeAppModal();
  });

  // Finalizar Compra via WhatsApp
  elements.btnCheckoutWhatsApp.addEventListener("click", handleWhatsAppCheckout);
}

// Atualiza o painel de resultados da busca rápida
function updateQuickSearch() {
  const query = currentSearchQuery.toLowerCase().trim();
  if (query === "") {
    elements.quickSearchResults.style.display = "none";
    return;
  }

  const matches = PRODUCTS_DB.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);

  if (matches.length === 0) {
    elements.quickSearchResults.style.display = "none";
    return;
  }

  elements.quickSearchResults.innerHTML = "";
  elements.quickSearchResults.style.display = "block";

  matches.forEach(product => {
    const item = document.createElement("div");
    item.className = "quick-search-item";
    item.innerHTML = `
      <div class="quick-search-img" style="background-color: var(--primary-light); color: ${product.color}">
        <i class="${product.icon}"></i>
      </div>
      <div class="quick-search-info">
        <div class="quick-search-name">${product.name}</div>
        <div class="quick-search-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
      </div>
    `;
    item.addEventListener("click", () => {
      addToCart(product.id);
      elements.quickSearchResults.style.display = "none";
      elements.searchInput.value = "";
      currentSearchQuery = "";
      renderCatalog();
    });
    elements.quickSearchResults.appendChild(item);
  });
}
