import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Filter, Search } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  
  // Configuration des catégories avec leurs couleurs et gradients
  const categoryConfig = {
    SLEEP: {
      title: "SLEEP",
      gradient: "from-blue-400 to-blue-800",
      background: "linear-gradient(99deg, #27A5FF 3.67%, #4327FF 91.7%)",
      hero: {
        title: "Put your mind to sleep",
        subtitle: "Drift off with sleep meditations, sleep music, and more",
        description: "Sleep by Headspace is designed to bring some ease to your bedtime routine. Consider it a sleep app within our main app, offering guided meditations, wind downs, sleep music, soundscapes, and our ever-popular sleepcasts."
      },
      subCategories: [
        { name: "Lucid Dreams", isActive: true },
        { name: "Sleep Types", isActive: false },
        { name: "Sleep Quality", isActive: false },
        { name: "Daily Routines", isActive: false },
        { name: "Technology", isActive: false }
      ]
    },
    MIND: {
      title: "MIND",
      gradient: "from-purple-400 to-purple-800",
      background: "linear-gradient(99deg, #8B5CF6 3.67%, #6366F1 91.7%)",
      hero: {
        title: "Cultivate your mind",
        subtitle: "Mindfulness practices for daily clarity",
        description: "Mind by Lifestyle is designed to help you develop mindfulness and mental clarity. Explore meditation techniques, visualization exercises, and cognitive training to enhance your mental well-being."
      },
      subCategories: [
        { name: "Mindfulness", isActive: true },
        { name: "Visualization", isActive: false },
        { name: "Meditation", isActive: false },
        { name: "Focus", isActive: false },
        { name: "Awareness", isActive: false }
      ]
    },
    MENTAL: {
      title: "MENTAL",
      gradient: "from-pink-400 to-pink-800",
      background: "linear-gradient(99deg, #EC4899 3.67%, #BE185D 91.7%)",
      hero: {
        title: "Strengthen your mental health",
        subtitle: "Tools for emotional balance and resilience",
        description: "Mental wellness resources to help you manage stress, anxiety, and emotional challenges. Build resilience and develop healthy coping strategies for better mental health."
      },
      subCategories: [
        { name: "Emotional Balance", isActive: true },
        { name: "Anxiety Relief", isActive: false },
        { name: "Stress Management", isActive: false },
        { name: "Resilience", isActive: false },
        { name: "Therapy", isActive: false }
      ]
    },
    SOUL: {
      title: "SOUL",
      gradient: "from-red-400 to-red-800",
      background: "linear-gradient(99deg, #F87171 3.67%, #DC2626 91.7%)",
      hero: {
        title: "Nourish your soul",
        subtitle: "Spiritual practices for inner peace",
        description: "Connect with your inner self through spiritual practices, personal growth exercises, and soul-nourishing activities designed to bring meaning and purpose to your life."
      },
      subCategories: [
        { name: "Spirituality", isActive: true },
        { name: "Inner Peace", isActive: false },
        { name: "Self Love", isActive: false },
        { name: "Purpose", isActive: false },
        { name: "Gratitude", isActive: false }
      ]
    },
    BODY: {
      title: "BODY",
      gradient: "from-orange-400 to-orange-800",
      background: "linear-gradient(99deg, #FB923C 3.67%, #EA580C 91.7%)",
      hero: {
        title: "Strengthen your body",
        subtitle: "Physical wellness and fitness guidance",
        description: "Take care of your physical health with workout routines, nutrition guidance, and wellness practices designed to keep your body strong and healthy."
      },
      subCategories: [
        { name: "Fitness", isActive: true },
        { name: "Nutrition", isActive: false },
        { name: "Movement", isActive: false },
        { name: "Recovery", isActive: false },
        { name: "Strength", isActive: false }
      ]
    },
    BRAIN: {
      title: "BRAIN",
      gradient: "from-yellow-400 to-yellow-800",
      background: "linear-gradient(99deg, #FBBF24 3.67%, #D97706 91.7%)",
      hero: {
        title: "Train your brain",
        subtitle: "Cognitive enhancement and brain training",
        description: "Enhance your cognitive abilities with brain training exercises, memory improvement techniques, and mental agility practices designed to optimize your brain function."
      },
      subCategories: [
        { name: "Memory", isActive: true },
        { name: "Focus", isActive: false },
        { name: "Learning", isActive: false },
        { name: "Creativity", isActive: false },
        { name: "Logic", isActive: false }
      ]
    },
    FOOD: {
      title: "FOOD",
      gradient: "from-green-400 to-green-800",
      background: "linear-gradient(99deg, #4ADE80 3.67%, #166534 91.7%)",
      hero: {
        title: "Nourish with food",
        subtitle: "Nutrition and mindful eating practices",
        description: "Discover the power of nutrition and mindful eating. Learn about healthy recipes, nutritional science, and eating practices that support your overall wellness."
      },
      subCategories: [
        { name: "Nutrition", isActive: true },
        { name: "Recipes", isActive: false },
        { name: "Mindful Eating", isActive: false },
        { name: "Supplements", isActive: false },
        { name: "Detox", isActive: false }
      ]
    },
    HEALTH: {
      title: "HEALTH",
      gradient: "from-cyan-400 to-cyan-800",
      background: "linear-gradient(99deg, #22D3EE 3.67%, #0E7490 91.7%)",
      hero: {
        title: "Optimize your health",
        subtitle: "Holistic health and wellness practices",
        description: "Take a comprehensive approach to your health with evidence-based practices, preventive care insights, and holistic wellness strategies for optimal living."
      },
      subCategories: [
        { name: "Preventive Care", isActive: true },
        { name: "Wellness", isActive: false },
        { name: "Habits", isActive: false },
        { name: "Lifestyle", isActive: false },
        { name: "Science", isActive: false }
      ]
    }
  };

  const currentCategory = category?.toUpperCase() as keyof typeof categoryConfig;
  const config = categoryConfig[currentCategory] || categoryConfig.SLEEP;

  // Articles mockup data
  const articles = [
    {
      title: "How to make the dreams last",
      category: "Lucid Dreams",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640"
    },
    {
      title: "What is your sleep type?",
      category: "Sleep types", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640"
    },
    {
      title: "How to have a clean sleep at night",
      category: "Sleep quality",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640"
    },
    {
      title: "Have your own daily routine!",
      category: "Daily routines",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e522cc4ae8fe3db303abab4412d69b57558f552a?width=640"
    }
  ];

  const popularArticles = [
    {
      title: "How to become mindful in a month",
      category: "Mindfulness",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640"
    },
    {
      title: "Visualize the entire universe with the power of meditation",
      category: "Visualization", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640"
    },
    {
      title: "Develop your self love",
      category: "Inner peace",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640"
    },
    {
      title: "How to leverage the true power of your mind",
      category: "Focused mind",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640"
    }
  ];

  useEffect(() => {
    if (config.subCategories.length > 0) {
      setSelectedSubCategory(config.subCategories[0].name);
    }
  }, [category]);

  const categoryPills = [
    { name: "SLEEP", colors: "from-blue-400 to-blue-800" },
    { name: "MIND", colors: "from-purple-400 to-purple-800" },
    { name: "MENTAL", colors: "from-pink-400 to-pink-800" },
    { name: "SOUL", colors: "from-red-400 to-red-800" },
    { name: "BODY", colors: "from-orange-400 to-orange-800" },
    { name: "BRAIN", colors: "from-yellow-400 to-yellow-800" },
    { name: "FOOD", colors: "from-green-400 to-green-800" },
    { name: "HEALTH", colors: "from-cyan-400 to-cyan-800" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <div className="bg-black h-12 flex items-center justify-between px-6">
        <div className="text-white font-bold text-2xl font-righteous">Lifestyle</div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm underline">Subscribe</span>
          <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold">
            Log in
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <div 
        className="relative min-h-screen"
        style={{ background: config.background }}
      >
        {/* Navigation Pills */}
        <div className="flex gap-2 px-6 py-4">
          {categoryPills.map((pill) => (
            <button
              key={pill.name}
              onClick={() => navigate(`/category/${pill.name.toLowerCase()}`)}
              className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                pill.name === currentCategory
                  ? "bg-white text-black border-2 border-black"
                  : "bg-black text-white"
              }`}
            >
              {pill.name}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-16 gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              {config.hero.title}
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-8">
              {config.hero.subtitle}
            </h2>
            <p className="text-xl text-white mb-12 leading-relaxed">
              {config.hero.description}
            </p>

            {/* Audio Player */}
            <div className="bg-white rounded-2xl p-6 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </button>
                <span className="text-sm text-gray-600">Alone time</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">0:00</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                  <div className="w-2 h-2 bg-blue-600 rounded-full absolute left-0 top-0"></div>
                </div>
                <span className="text-xs text-gray-400">4:34</span>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-medium hover:bg-blue-700 transition-colors">
              Try Lifestyle
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-96 bg-black rounded-3xl p-2">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-purple-600 rounded-2xl overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/25a7cbb0066f516134cbed838dae9c33fc7224ce?width=668"
                  alt="Phone interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-category Pills */}
        <div className="px-6 lg:px-24 pb-8">
          <div className="flex flex-wrap gap-4">
            {config.subCategories.map((subCat) => (
              <button
                key={subCat.name}
                onClick={() => setSelectedSubCategory(subCat.name)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-colors ${
                  subCat.isActive || selectedSubCategory === subCat.name
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white px-6 lg:px-24 py-20">
        {/* Feature Sections */}
        <div className="space-y-20 mb-20">
          {/* Section 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-4xl font-bold text-white mb-6">
                Unlock the World of Lucid Dreams
              </h3>
              <p className="text-xl text-white leading-relaxed">
                Embark on a journey into the fascinating realm of lucid dreaming with our dedicated app. 
                Designed to guide you toward heightened awareness during sleep, it offers guided meditations, 
                relaxation techniques, soothing soundscapes, and immersive sessions to help you take control of your dreams.
              </p>
            </div>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/9a1e701f6f94488ef701d75926439d7dbd80d143?width=1128"
              alt="Dream visualization"
              className="flex-shrink-0 w-full lg:w-96 h-64 object-cover rounded-3xl"
            />
          </div>

          {/* Section 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h3 className="text-4xl font-bold text-white mb-6">
                Master Your Dreams, Master Your Mind
              </h3>
              <p className="text-xl text-white leading-relaxed">
                Our innovative app accompanies you in learning lucid dreaming techniques. Through interactive tools, 
                practical exercises, and personalized advice, you'll develop the ability to recognize and control your dreams. 
                Elevate your nocturnal consciousness and explore the depths of your imagination.
              </p>
            </div>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/3311da80a30f20b1fea8c4d496d0feb16d8e2c94?width=1128"
              alt="Mind mastery"
              className="flex-shrink-0 w-full lg:w-96 h-64 object-cover rounded-3xl"
            />
          </div>

          {/* Section 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-4xl font-bold text-white mb-6">
                Consciously Journey Through Your Dreams
              </h3>
              <p className="text-xl text-white leading-relaxed">
                Gift yourself a unique dream experience with our app dedicated to lucid dreaming. It offers structured programs, 
                reality check reminders, and sleep cycle analyses to promote the emergence of lucid dreams. Awaken your mind 
                during the night and discover a world where your dreams become reality.
              </p>
            </div>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ee9fd97ab69df9e6977260a5b6a52de12677850c?width=1128"
              alt="Dream journey"
              className="flex-shrink-0 w-full lg:w-96 h-64 object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* Articles Sections */}
        <div className="space-y-20">
          {/* Last Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Last Articles on Lucid Dreaming</h2>
              <div className="flex gap-2">
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                  />
                  <p className="text-sm font-semibold text-black mb-2">{article.category}</p>
                  <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Most Popular Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Most Popular Articles on Lucid Dreaming</h2>
              <div className="flex gap-2">
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularArticles.map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                  />
                  <p className="text-sm font-semibold text-black mb-2">{article.category}</p>
                  <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Here some cool articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Here some cool articles</h2>
              <div className="flex gap-2">
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                  />
                  <p className="text-sm font-semibold text-black mb-2">{article.category}</p>
                  <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* All Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">All Articles</h2>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-full">
                  <Filter size={20} />
                  Filter by A-Z
                </button>
                <div className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full">
                  <span className="text-gray-600">Rechercher</span>
                  <Search size={20} className="text-gray-600" />
                </div>
              </div>
            </div>
            
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...articles, ...articles, ...articles, ...articles].map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                  />
                  <p className="text-sm font-semibold text-black mb-2">{article.category}</p>
                  <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-medium">1/4</span>
              <div className="flex gap-2">
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-8 mb-8 lg:mb-0">
              <span className="text-white">© 2025 Scientologic Inc.</span>
              <a href="#" className="text-white underline hover:text-gray-300">Terms & conditions</a>
              <a href="#" className="text-white underline hover:text-gray-300">Privacy policy</a>
              <a href="#" className="text-white underline hover:text-gray-300">Consumer Health Data</a>
              <a href="#" className="text-white underline hover:text-gray-300">CA Privacy Notice</a>
            </div>
            <div className="flex items-center gap-4 border-4 border-white rounded-full px-6 py-3">
              <span className="text-white text-xl">🌐</span>
              <span className="text-white text-xl">English</span>
              <ChevronRight className="text-white transform rotate-90" size={24} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
