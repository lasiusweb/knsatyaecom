
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Product, Category, BlogPost, BlogCategory, Subcategories } from './types';
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


const MOCK_PRODUCTS: Product[] = [
  // Agriculture
  { id: 1, name: 'Nano Fertilizer', category: Category.Agriculture, subCategory: 'Nano Fertilizers', description: 'Advanced nano-technology for maximum nutrient absorption.', longDescription: 'Our advanced Nano Fertilizer uses cutting-edge nanotechnology to deliver essential nutrients directly to plant cells, ensuring maximum absorption and minimal waste. It is highly effective for a wide range of crops, boosting growth, and improving soil health over time. Suitable for organic farming.', price: 55.00, imageUrl: 'https://picsum.photos/400/400?nature,fertilizer', tags: ['Organic', 'Liquid', 'For Rice'], ctaType: 'e-commerce', rating: 4.8, reviewCount: 124, isBestseller: true, frequentlyBoughtWith: [6, 10] },
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

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-brand-secondary"></div>
  </div>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('Home');
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
  
  const handleSelectCategory = (category: Category | null) => {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
      if (category) setCurrentPage('Products');
  }

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

  const handleShopNow = () => {
      setCurrentPage('Products');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setViewingProduct(null);
      window.scrollTo(0, 0);
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
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? product.tags.includes(selectedTag) : true;
      return matchesCategory && matchesSubCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, selectedSubCategory, searchTerm, selectedTag]);

  const renderPage = () => {
    if (currentPage === 'Products' && viewingProduct) {
        return <ProductDetailPage product={viewingProduct} allProducts={MOCK_PRODUCTS} onBack={() => setViewingProduct(null)} onViewProduct={handleViewProduct} />;
    }
    if (currentPage === 'Blog' && viewingPost) {
        return <BlogPostPage post={viewingPost} onBack={() => setViewingPost(null)} />;
    }
    
    switch(currentPage) {
        case 'Home':
            return <HomePage products={MOCK_PRODUCTS} posts={MOCK_POSTS} onShopNow={handleShopNow} onSelectCategory={handleHomePageCategoryJump} onReadPost={handleReadPost} onViewProduct={handleViewProduct} />;
        case 'Products':
             return <ProductsPage 
                        products={filteredProducts} 
                        categories={productCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                        subcategories={subcategoriesForSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        onSelectSubCategory={setSelectedSubCategory}
                        onViewProduct={handleViewProduct}
                        allTags={allTags}
                        selectedTag={selectedTag}
                        onSelectTag={setSelectedTag}
                    />;
        case 'Blog':
            return <BlogPage posts={MOCK_POSTS} onViewPost={handleReadPost} />;
        case 'About':
            return <AboutPage />;
        case 'Organic Farming':
            return <OrganicFarmingPage />;
        case 'Lab Services':
            return <LabServicesPage />;
        case 'Contact':
            return <ContactPage />;
        default:
            return <HomePage products={MOCK_PRODUCTS} posts={MOCK_POSTS} onShopNow={handleShopNow} onSelectCategory={handleHomePageCategoryJump} onReadPost={handleReadPost} onViewProduct={handleViewProduct} />;
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
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer setCurrentPage={handleSetCurrentPage} />
      <ChatAssistant />
    </div>
  );
};

export default App;