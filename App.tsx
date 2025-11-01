import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// Fix: Import centralized User and Order types
import { Product, Category, BlogPost, BlogCategory, Subcategories, User, Order } from './types';
import ChatAssistant from './components/ChatAssistant';

// Lazy load page components to enable code-splitting
const HomePage = lazy(() => import('./components/HomePage'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const OrganicFarmingPage = lazy(() => import('./components/OrganicFarmingPage'));
const LabServicesPage = lazy(() => import('./components/LabServicesPage'));
const SignInPage = lazy(() => import('./components/SignInPage'));
const SignUpPage = lazy(() => import('./components/SignUpPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));


const MOCK_PRODUCTS: Product[] = [
  // Agriculture
  { 
    id: 1, 
    name: 'Nano Fertilizer', 
    category: Category.Agriculture, 
    subCategory: 'Nano Fertilizers', 
    description: 'Advanced nano-technology for maximum nutrient absorption.', 
    longDescription: 'Our advanced Nano Fertilizer uses cutting-edge nanotechnology to deliver essential nutrients directly to plant cells, ensuring maximum absorption and minimal waste. It is highly effective for a wide range of crops, boosting growth, and improving soil health over time. Suitable for organic farming.', 
    price: 55.00, 
    imageUrl: 'https://picsum.photos/400/400?nature,fertilizer', 
    tags: ['Organic', 'Liquid', 'For Rice'], 
    ctaType: 'e-commerce', 
    rating: 4.8, 
    reviewCount: 124, 
    isBestseller: true, 
    frequentlyBoughtWith: [6, 10],
    variants: [
        { id: '1-500ml', name: '500ml', price: 55.00, imageUrl: 'https://picsum.photos/400/400?nature,bottle,liquid', stock: 'in-stock' },
        { id: '1-1l', name: '1L', price: 95.00, imageUrl: 'https://picsum.photos/400/400?nature,fertilizer,can', stock: 'low-stock' },
        { id: '1-2l', name: '2L', price: 180.00, imageUrl: 'https://picsum.photos/400/400?nature,fertilizer,largecan', stock: 'out-of-stock' },
    ]
  },
  { id: 6, name: 'Growth Promoter (Agri)', category: Category.Agriculture, subCategory: 'Growth Promoters', description: 'Organic plant growth stimulant for enhanced root development.', longDescription: 'A powerful blend of natural extracts and beneficial microbes that stimulate vigorous root development and overall plant growth. This organic promoter enhances nutrient uptake, improves stress resistance, and increases crop yield. Ideal for cotton and vegetable farming.', price: 29.99, imageUrl: 'https://picsum.photos/400/400?nature,plant', tags: ['Organic', 'For Cotton'], ctaType: 'e-commerce', rating: 4.5, reviewCount: 88, isBestseller: false },
  { id: 10, name: 'Bio Fungicide', category: Category.Agriculture, subCategory: 'Bio-Control', description: 'Broad-spectrum bio-fungicide to protect crops from fungal diseases.', longDescription: 'Protect your crops naturally with our Bio-Fungicide. It contains beneficial microorganisms that actively combat a wide range of fungal pathogens, preventing diseases like blight and mildew without the use of harsh chemicals. Safe for the environment and beneficial insects.', price: 40.00, imageUrl: 'https://picsum.photos/400/400?nature,leaves', tags: ['Bio-Control', 'For Sugarcane'], ctaType: 'e-commerce', rating: 4.6, reviewCount: 95, isBestseller: false },
  
  // Aquaculture
  { id: 2, name: 'Pond Soil Probiotics', category: Category.Aquaculture, subCategory: 'Pond Management', description: 'Enhances pond soil quality, reducing harmful bacteria for healthier shrimp.', longDescription: 'This powerful probiotic blend works at the bottom of the pond to decompose organic sludge and eliminate harmful bacteria. It creates a healthier environment for shrimp, reducing the risk of disease and improving water quality from the ground up.', price: 42.50, imageUrl: 'https://picsum.photos/400/400?nature,water', tags: ['For Shrimp', 'Saltwater'], ctaType: 'e-commerce', rating: 4.9, reviewCount: 152, isBestseller: true, frequentlyBoughtWith: [7, 11] },
  { id: 7, name: 'Ammonia Control (Aqua)', category: Category.Aquaculture, subCategory: 'Ammonia Control', description: 'Effectively reduces toxic ammonia levels in aquaculture ponds.', longDescription: 'High ammonia levels can be fatal to aquatic life. Our Ammonia Control formula rapidly neutralizes toxic ammonia, nitrite, and nitrate, creating a safer and less stressful environment for fish and shrimp. Essential for high-density farming.', price: 65.00, imageUrl: 'https://picsum.photos/400/400?nature,pond', tags: ['For Fish', 'Freshwater'], ctaType: 'e-commerce', rating: 4.7, reviewCount: 110, isBestseller: false },
  { id: 11, name: 'Water Probiotics (Aqua)', category: Category.Aquaculture, subCategory: 'Water Probiotics', description: 'Improves water clarity and quality by balancing microbial ecosystems.', longDescription: 'Maintain a healthy, balanced aquatic ecosystem with our Water Probiotics. These beneficial bacteria actively consume excess nutrients, reduce algae growth, and improve water clarity, ensuring optimal conditions for your fish or shrimp to thrive.', price: 50.00, imageUrl: 'https://picsum.photos/400/400?nature,lake', tags: ['For Shrimp', 'Probiotics'], ctaType: 'e-commerce', rating: 4.6, reviewCount: 78, isBestseller: false },

  // Poultry
  { id: 3, name: 'Nutritional Feed Supplement', category: Category.Poultry, subCategory: 'Feed Supplements', description: 'Boosts immunity and growth in poultry with essential vitamins.', longDescription: 'Ensure your flock reaches its full potential with our Nutritional Feed Supplement. Fortified with essential vitamins, minerals, and amino acids, it boosts the immune system, improves feed conversion ratios, and promotes healthy growth in both broilers and layers.', price: 35.00, imageUrl: 'https://picsum.photos/400/400?nature,chicken', tags: ['Broilers', 'Medicated'], ctaType: 'e-commerce', rating: 4.8, reviewCount: 210, isBestseller: true },
  { id: 8, name: 'Litter Management (Poultry)', category: Category.Poultry, subCategory: 'Litter Management', description: 'Keeps poultry litter dry and reduces ammonia, preventing diseases.', longDescription: 'Proper litter management is key to a healthy flock. Our product is a highly absorbent, natural solution that keeps litter dry, controls ammonia levels, and inhibits the growth of harmful pathogens, leading to healthier birds and a cleaner environment.', price: 25.00, imageUrl: 'https://picsum.photos/400/400?nature,farmhouse', tags: ['Layers', 'Organic'], ctaType: 'e-commerce', rating: 4.4, reviewCount: 65, isBestseller: false },

  // Industrial Waste Management
  { id: 4, name: 'Bio-Augmentation for ETP', category: Category.IndustrialWasteManagement, subCategory: 'ETP Solutions', description: 'Microbial solution for efficient breakdown of industrial effluent.', longDescription: 'Our Bio-Augmentation formula contains a consortium of high-potency microbes specifically selected for their ability to degrade complex organic compounds in industrial wastewater. It enhances the efficiency of Effluent Treatment Plants (ETPs), reduces sludge, and controls odors.', price: 120.00, imageUrl: 'https://picsum.photos/400/400?nature,industry', tags: ['Industrial', 'Wastewater'], ctaType: 'b2b', rating: 4.9, reviewCount: 45, isBestseller: true },
  { id: 12, name: 'STP Treatment Solution', category: Category.IndustrialWasteManagement, subCategory: 'STP Solutions', description: 'High-potency bacteria for maintaining Sewage Treatment Plants.', longDescription: 'A powerful microbial solution designed to improve the performance of Sewage Treatment Plants (STPs). It effectively breaks down organic waste, reduces BOD/COD levels, and ensures compliance with environmental regulations. Ideal for municipal and commercial STPs.', price: 150.00, imageUrl: 'https://picsum.photos/400/400?nature,pipe', tags: ['Municipal', 'Wastewater'], ctaType: 'b2b', rating: 4.7, reviewCount: 32, isBestseller: false },

  // Farm Equipment
  { id: 5, name: 'Electric Tiller', category: Category.FarmEquipment, subCategory: 'Electrical Tillers', description: 'Powerful and eco-friendly electric tiller for small to medium farms.', longDescription: 'Experience the future of farming with our Electric Tiller. It offers powerful performance without the noise, fumes, or maintenance of gas-powered models. With adjustable tilling width and depth, it\'s perfect for soil preparation in small to medium-sized farms and gardens. Comes with a 2-year warranty.', price: 499.99, imageUrl: 'https://picsum.photos/400/400?nature,tractor', tags: ['Electric', '2 Year Warranty'], ctaType: 'equipment', rating: 4.8, reviewCount: 55, isBestseller: true },
  { id: 9, name: 'Rotovator Attachment', category: Category.FarmEquipment, subCategory: 'Rotovators', description: 'Durable rotovator for tractors, perfect for soil preparation.', longDescription: 'This heavy-duty rotovator attachment is built to last. Designed for tractors in the 45-55 HP range, it efficiently prepares seedbeds, controls weeds, and incorporates fertilizers into the soil. Its robust construction ensures reliable performance even in tough soil conditions.', price: 850.00, imageUrl: 'https://picsum.photos/400/400?nature,field', tags: ['45-55 HP Range', 'Diesel'], ctaType: 'equipment', rating: 4.6, reviewCount: 40, isBestseller: false },
];

const MOCK_POSTS: BlogPost[] = [
    { id: 1, title: '5 Tips for Boosting Crop Yield with Micronutrients', date: 'August 12, 2024', author: 'Dr. Anjali Rao', category: BlogCategory.Tips, tags: ['agriculture', 'fertilizers', 'yield'], imageUrl: 'https://picsum.photos/600/400?crop,field', excerpt: 'Discover how the strategic use of micronutrients can dramatically improve the health and yield of your crops this season.', content: 'Micronutrients are essential for plant growth, but are only needed in small quantities. Their deficiency can cause serious issues...\nThis article explores the roles of zinc, boron, and manganese in plant development and provides practical tips for application.' },
    { id: 2, title: 'KN Biosciences Acquires New Research Facility', date: 'August 1, 2024', author: 'P. Sudha Reddy', category: BlogCategory.News, tags: ['company', 'expansion', 'research'], imageUrl: 'https://picsum.photos/600/400?building,modern', excerpt: 'We are thrilled to announce the expansion of our R&D capabilities with a new state-of-the-art laboratory in Genome Valley.', content: 'This new facility will accelerate our innovation in nano-fertilizers and bio-control agents, reinforcing our commitment to sustainable agriculture.\nOur team of scientists is excited to leverage the advanced instrumentation to tackle the most pressing challenges in the field.' },
    { id: 3, title: 'The Future of Aquaculture: Probiotics vs. Antibiotics', date: 'July 25, 2024', author: 'Dr. Vikram Singh', category: BlogCategory.Research, tags: ['aquaculture', 'probiotics', 'sustainability'], imageUrl: 'https://picsum.photos/600/400?shrimp,farm', excerpt: 'A deep dive into the growing body of research supporting the use of probiotics for disease prevention in shrimp and fish farming.', content: 'For decades, antibiotics were the go-to solution for disease outbreaks in aquaculture. However, concerns about antibiotic resistance have shifted the focus towards preventative measures like probiotics.\nProbiotics work by introducing beneficial bacteria to the pond ecosystem, which outcompete pathogenic bacteria and improve water quality, leading to healthier aquatic life.' },
    { id: 4, title: 'A Farmer\'s Success with Our Seed Treatment', date: 'July 18, 2024', author: 'Customer Stories', category: BlogCategory.Success, tags: ['testimonial', 'agriculture', 'seeds'], imageUrl: 'https://picsum.photos/600/400?farmer,happy', excerpt: 'Read how Mr. Ramesh Patil from Maharashtra transformed his farm\'s productivity using our bio-stimulant seed treatment.', content: '"I was skeptical at first," says Ramesh, "but the results were undeniable. Germination rates were higher, and the plants were visibly healthier from the start."\nHis story is a testament to the power of investing in quality inputs right from the beginning of the crop cycle.' },
];

// Fix: Add explicit Order[] type to MOCK_ORDERS to prevent type inference issues.
const MOCK_ORDERS: Order[] = [
    { id: 'KN-84321', date: '2024-08-15', total: 142.50, status: 'Delivered', items: [{...MOCK_PRODUCTS[1], quantity: 1}, {...MOCK_PRODUCTS[0], quantity: 1}] },
    { id: 'KN-82998', date: '2024-07-22', total: 70.00, status: 'Delivered', items: [{...MOCK_PRODUCTS[2], quantity: 2}] },
    { id: 'KN-79145', date: '2024-06-05', total: 524.99, status: 'Delivered', items: [{...MOCK_PRODUCTS[4], quantity: 1}, {...MOCK_PRODUCTS[7], quantity: 1}] },
];

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-brand-secondary"></div>
  </div>
);

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onViewFullDetails }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative p-4">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="grid md:grid-cols-2 gap-8 p-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-brand-accent dark:text-brand-primary mb-2">{product.name}</h2>
              <p className="text-2xl font-bold text-brand-secondary mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{product.description}</p>
              <div className="mt-auto space-y-3">
                 <button onClick={() => alert(`${product.name} added to cart!`)} className="w-full bg-brand-accent text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-all">
                    Add to Cart
                 </button>
                 <button onClick={() => onViewFullDetails(product)} className="w-full text-center text-brand-secondary font-semibold hover:underline">
                    View Full Details &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('Home');
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Data and loading states
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Simulate initial data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllProducts(MOCK_PRODUCTS);
      setAllPosts(MOCK_POSTS);
      setProductsLoading(false);
      setPostsLoading(false);
    }, 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handleSetCurrentPage = (page: string, category?: Category) => {
    setCurrentPage(page);
    setViewingPost(null); 
    setViewingProduct(null);
    if(page === 'Products' && category) {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
    } else if (page !== 'Products') {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
    }
    window.scrollTo(0, 0);
  };
  
  // Handlers for product filtering with loading simulation
  const handleWithFilterLoading = (action: () => void) => {
    setIsFiltering(true);
    setTimeout(() => {
        action();
        setIsFiltering(false);
    }, 500); // 0.5-second filtering delay
  };

  const handleSelectCategory = (category: Category | null) => {
    handleWithFilterLoading(() => {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
        if (category) setCurrentPage('Products');
    });
  };
  
  const handleSelectSubCategory = (subCategory: string | null) => {
    handleWithFilterLoading(() => setSelectedSubCategory(subCategory));
  };
  
  const handleSelectTag = (tag: string | null) => {
      handleWithFilterLoading(() => setSelectedTag(tag));
  };

  const handleHomePageCategoryJump = (page: string, category: Category) => {
      setCurrentPage(page);
      if (page === 'Products') {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
      }
      window.scrollTo(0,0);
  }
  
  const handleReadPost = (post: BlogPost) => {
      setViewingPost(post);
      setViewingProduct(null);
      setCurrentPage('Blog');
      window.scrollTo(0,0);
  }

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setCurrentPage('Products'); // Keep the page context
    window.scrollTo(0, 0);
  };

  const handleQuickViewOpen = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleQuickViewClose = () => {
    setQuickViewProduct(null);
  };

  const handleViewFullDetailsFromModal = (product: Product) => {
    handleQuickViewClose();
    handleViewProduct(product);
  };

  const handleShopNow = () => {
      setCurrentPage('Products');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setViewingProduct(null);
      window.scrollTo(0, 0);
  };

  const handleSignIn = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('Home');
    window.scrollTo(0, 0);
  };

  const handleSignUp = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('Home');
    window.scrollTo(0, 0);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentPage('Home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    // In a real app, you'd also make an API call here
    alert('Profile updated successfully!');
  };


  const productCategories = useMemo(() => {
    return [
      Category.Agriculture,
      Category.Aquaculture,
      Category.Poultry,
      Category.IndustrialWasteManagement,
      Category.FarmEquipment,
    ]
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_PRODUCTS.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).filter(t => !['Industrial', 'Municipal', 'Wastewater', 'Diesel', 'Electric'].includes(t)).sort();
  }, []);

  const subcategoriesForSelectedCategory = useMemo(() => {
    return selectedCategory ? Subcategories[selectedCategory] : [];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? product.tags.includes(selectedTag) : true;
      return matchesCategory && matchesSubCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, selectedSubCategory, searchTerm, selectedTag, allProducts]);

  const renderPage = () => {
    if (currentPage === 'Products' && viewingProduct) {
        return <ProductDetailPage product={viewingProduct} allProducts={allProducts} onBack={() => setViewingProduct(null)} onViewProduct={handleViewProduct} onQuickView={handleQuickViewOpen} isLoggedIn={!!currentUser} />;
    }
    if (currentPage === 'Blog' && viewingPost) {
        return <BlogPostPage post={viewingPost} onBack={() => setViewingPost(null)} />;
    }
    
    switch(currentPage) {
        case 'Home':
            return <HomePage products={allProducts} posts={allPosts} onShopNow={handleShopNow} onSelectCategory={handleHomePageCategoryJump} onReadPost={handleReadPost} onViewProduct={handleViewProduct} onQuickView={handleQuickViewOpen} productsLoading={productsLoading} postsLoading={postsLoading} />;
        case 'Products':
             return <ProductsPage 
                        products={filteredProducts} 
                        categories={productCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                        subcategories={subcategoriesForSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        onSelectSubCategory={handleSelectSubCategory}
                        onViewProduct={handleViewProduct}
                        onQuickView={handleQuickViewOpen}
                        allTags={allTags}
                        selectedTag={selectedTag}
                        onSelectTag={handleSelectTag}
                        isLoading={productsLoading || isFiltering}
                    />;
        case 'Blog':
            return <BlogPage posts={allPosts} onViewPost={handleReadPost} />;
        case 'About':
            return <AboutPage />;
        case 'Organic Farming':
            return <OrganicFarmingPage />;
        case 'Lab Services':
            return <LabServicesPage />;
        case 'Contact':
            return <ContactPage />;
        case 'SignIn':
            return <SignInPage onSignIn={handleSignIn} onSignUpClick={() => handleSetCurrentPage('SignUp')} onDemoLogin={handleSignIn} />;
        case 'SignUp':
            return <SignUpPage onSignUp={handleSignUp} onSignInClick={() => handleSetCurrentPage('SignIn')} />;
        case 'Profile':
            return currentUser ? <ProfilePage user={currentUser} orders={MOCK_ORDERS} onUpdateUser={handleUpdateUser} /> : <SignInPage onSignIn={handleSignIn} onSignUpClick={() => handleSetCurrentPage('SignUp')} onDemoLogin={handleSignIn} />;
        default:
            return <HomePage products={allProducts} posts={allPosts} onShopNow={handleShopNow} onSelectCategory={handleHomePageCategoryJump} onReadPost={handleReadPost} onViewProduct={handleViewProduct} onQuickView={handleQuickViewOpen} productsLoading={productsLoading} postsLoading={postsLoading} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={handleSetCurrentPage}
        isLoggedIn={!!currentUser}
        userName={currentUser?.name.split(' ')[0] || null}
        onSignOut={handleSignOut}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={handleQuickViewClose} 
        onViewFullDetails={handleViewFullDetailsFromModal}
      />
      <Footer setCurrentPage={handleSetCurrentPage} />
      <ChatAssistant />
    </div>
  );
};

export default App;