import { ChevronLeft, ChevronRight, Filter, Play, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryConfig, categoryPills, subCategoryContentMap } from "../assets/CategoryPage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  ArticleWithContent,
  debugSubsections,
  fetchAllArticlesBySection,
  fetchArticlesBySubsection,
  fetchLatestArticlesBySection,
  fetchLatestArticlesBySubsection,
  fetchPopularArticlesBySection,
  fetchPopularArticlesBySubsection,
  testConnection
} from "../lib/articleService";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [latestArticles, setLatestArticles] = useState<ArticleWithContent[]>([]);
  const [popularArticles, setPopularArticles] = useState<ArticleWithContent[]>([]);
  const [coolArticles, setCoolArticles] = useState<ArticleWithContent[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleWithContent[]>([]);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [gridLoading, setGridLoading] = useState(true);

  const currentCategory =
    category?.toUpperCase() as keyof typeof categoryConfig;
  const config = categoryConfig[currentCategory] || categoryConfig.SLEEP;

  // Map category names to database sections (with proper capitalization)
  const categoryToSectionMap: { [key: string]: string } = {
    SLEEP: "Sleep",
    MIND: "Mind",
    MENTAL: "Mental",
    SOUL: "Soul",
    BODY: "Body",
    BRAIN: "Brain",
    FOOD: "Food",
    HEALTH: "Health",
  };

  const currentSection = categoryToSectionMap[currentCategory] || "Sleep";



  // Test database connection on mount
  useEffect(() => {
    testConnection();
    // Debug: Check what subsections exist in database
    if (currentSection) {
      debugSubsections(currentSection);
    }
  }, [currentSection]);

  // Initialize subcategory selection
  useEffect(() => {
    if (config.subCategories.length > 0) {
      setSelectedSubCategory(config.subCategories[0].name);
    }
  }, [category]);

  // Fetch articles for the "All Articles" grid (entire section, no subcategory filter)
  useEffect(() => {
    const fetchAllArticlesForGrid = async () => {
      console.log("Fetching all articles for grid, section:", currentSection);
      setGridLoading(true);
      try {
        const allData = await fetchAllArticlesBySection(currentSection, currentPage, 16);
        console.log("All articles for grid:", allData);

        setAllArticles(allData.articles);
        setTotalArticlesCount(allData.totalCount);
      } catch (error) {
        console.error("Error fetching all articles for grid:", error);
      } finally {
        setGridLoading(false);
      }
    };

    fetchAllArticlesForGrid();
  }, [currentSection, currentPage]);

  // Fetch articles by subcategory for carousels when selectedSubCategory changes
  useEffect(() => {
    const fetchSubcategoryArticles = async () => {
      if (!selectedSubCategory) return;

      console.log("Fetching carousel articles for subcategory:", selectedSubCategory);
      setCarouselLoading(true);

      try {
        // Map subcategory name to database subsection (with proper capitalization)
        const subcategoryToSubsectionMap: { [key: string]: string } = {
          "Lucid Dreams": "Lucid Dreams",
          "Sleep Types": "Sleep Types",
          "Sleep Quality": "Sleep Quality",
          "Daily Routines": "Daily Routines",
          "Technology": "Technology",
          "Mindfulness": "Mindfulness",
          "Visualization": "Visualization",
          "Inner Peace": "Inner Peace",
          "Focused Mind": "Focused Mind",
          "Guided Meditation": "Guided Meditation",
          // Add more mappings as needed for other categories
          "Emotional Balance": "Emotional Balance",
          "Anxiety Relief": "Anxiety Relief",
          "Positive Thinking": "Positive Thinking",
          "Cognitive Reset": "Cognitive Reset",
          "Inner Strength": "Inner Strength",
          "Social Dynamics": "Social Dynamics",
          "Soulmate": "Soulmate",
          "Sexuality": "Sexuality",
          "Friendship": "Friendship",
          "Family": "Family",
          "Strength": "Strength",
          "Flexibility": "Flexibility",
          "Cardio": "Cardio",
          "Recovery": "Recovery",
          "Sports": "Sports",
          "Mnemonics": "Mnemonics",
          "MindMap": "MindMap",
          "Speed Reading": "Speed Reading",
          "GPTpedia": "GPTpedia",
          "Tools": "Tools",
          "Nutrition": "Nutrition",
          "World Cuisine": "World Cuisine",
          "Special Diets": "Special Diets",
          "Snacks": "Snacks",
          "Creative": "Creative",
          "Wellness": "Wellness",
          "Prevention": "Prevention",
          "Balance": "Balance",
          "Vitality": "Vitality"
        };

        const subsection = subcategoryToSubsectionMap[selectedSubCategory];
        console.log("🗺️ Mapping process:", {
          selectedSubCategory: selectedSubCategory,
          mappedSubsection: subsection,
          currentSection: currentSection,
          available_mappings: Object.keys(subcategoryToSubsectionMap)
        });

        if (subsection) {
          // Fetch different types of articles specifically for this subcategory
          console.log("🔍 Fetching subsection-specific articles for section:", currentSection, "subsection:", subsection);
          const [latestSubsection, popularSubsection, coolSubsection] = await Promise.all([
            fetchLatestArticlesBySubsection(currentSection, subsection, 4),
            fetchPopularArticlesBySubsection(currentSection, subsection, 4),
            fetchArticlesBySubsection(currentSection, subsection, 4) // General articles for "cool"
          ]);

          console.log("📊 Subsection articles fetched:", {
            section: currentSection,
            subsection: subsection,
            latest: latestSubsection.length,
            popular: popularSubsection.length,
            cool: coolSubsection.length,
            latestTitles: latestSubsection.map(a => a.title),
            popularTitles: popularSubsection.map(a => a.title),
            coolTitles: coolSubsection.map(a => a.title)
          });

          // If no articles found for specific subcategory, fall back to section-wide articles
          if (latestSubsection.length === 0 && popularSubsection.length === 0 && coolSubsection.length === 0) {
            console.log("No articles found for subcategory, fetching section-wide articles");
            const [latest, popular, cool] = await Promise.all([
              fetchLatestArticlesBySection(currentSection, 4),
              fetchPopularArticlesBySection(currentSection, 4),
              fetchLatestArticlesBySection(currentSection, 4), // Using latest for "cool articles"
            ]);

            setLatestArticles(latest);
            setPopularArticles(popular);
            setCoolArticles(cool);
          } else {
            // Use subsection-specific articles for each carousel, with fallbacks if needed
            if (latestSubsection.length > 0) {
              setLatestArticles(latestSubsection);
            } else {
              const fallbackLatest = await fetchLatestArticlesBySection(currentSection, 4);
              setLatestArticles(fallbackLatest);
            }

            if (popularSubsection.length > 0) {
              setPopularArticles(popularSubsection);
            } else {
              const fallbackPopular = await fetchPopularArticlesBySection(currentSection, 4);
              setPopularArticles(fallbackPopular);
            }

            if (coolSubsection.length > 0) {
              setCoolArticles(coolSubsection);
            } else {
              const fallbackCool = await fetchLatestArticlesBySection(currentSection, 4);
              setCoolArticles(fallbackCool);
            }
          }
        } else {
          console.log("No mapping found for subcategory, fetching section-wide articles");
          // If no mapping found, fetch section-wide articles
          const [latest, popular, cool] = await Promise.all([
            fetchLatestArticlesBySection(currentSection, 4),
            fetchPopularArticlesBySection(currentSection, 4),
            fetchLatestArticlesBySection(currentSection, 4),
          ]);

          setLatestArticles(latest);
          setPopularArticles(popular);
          setCoolArticles(cool);
        }
      } catch (error) {
        console.error("Error fetching subcategory articles:", error);
        // Fallback to static data if database fails
        const staticData = getCategoryContent();
        setLatestArticles(staticData.articles.map((article, index) => ({
          id: `static-${index}`,
          section: currentSection,
          subsection: article.category,
          popularity: index,
          image_url: article.image,
          title: article.title
        })));
        setPopularArticles(staticData.popular.map((article, index) => ({
          id: `static-popular-${index}`,
          section: currentSection,
          subsection: article.category,
          popularity: index,
          image_url: article.image,
          title: article.title
        })));
        setCoolArticles(staticData.articles.map((article, index) => ({
          id: `static-cool-${index}`,
          section: currentSection,
          subsection: article.category,
          popularity: index,
          image_url: article.image,
          title: article.title
        })));
      } finally {
        setCarouselLoading(false);
      }
    };

    fetchSubcategoryArticles();
  }, [selectedSubCategory, currentSection]);

  // Helper function to add opacity to background
  const addOpacityToBackground = (background: string, opacity: number = 0.8) => {
    if (background.includes('linear-gradient')) {
      // For gradients, extract colors and add opacity
      return background.replace(/rgba?\(([^)]+)\)/g, (match, colors) => {
        const colorValues = colors.split(',').map((c: string) => c.trim());
        if (colorValues.length === 3) {
          return `rgba(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, ${opacity})`;
        }
        return match;
      });
    }
    return background;
  };

  // Helper function to get intermediate color from gradient
  const getIntermediateColor = (gradientBackground: string) => {
    // Extract rgba values and convert to intermediate color
    if (gradientBackground.includes('linear-gradient')) {
      // SLEEP category - blue gradient
      if (gradientBackground.includes('rgba(39, 165, 255') && gradientBackground.includes('rgba(67, 39, 255')) {
        return '#3b82f6'; // blue-500
      }
      // MIND category - purple gradient
      else if (gradientBackground.includes('rgba(139, 92, 246') && gradientBackground.includes('rgba(99, 102, 241')) {
        return '#8b5cf6'; // purple-500
      }
      // MENTAL category - pink gradient
      else if (gradientBackground.includes('rgba(236, 72, 153') && gradientBackground.includes('rgba(190, 24, 93')) {
        return '#ec4899'; // pink-500
      }
      // SOUL category - red gradient
      else if (gradientBackground.includes('rgba(248, 113, 113') && gradientBackground.includes('rgba(220, 38, 38')) {
        return '#ef4444'; // red-500
      }
      // BODY category - orange gradient
      else if (gradientBackground.includes('rgba(251, 146, 60') && gradientBackground.includes('rgba(234, 88, 12')) {
        return '#f97316'; // orange-500
      }
      // BRAIN category - yellow gradient
      else if (gradientBackground.includes('rgba(251, 191, 36') && gradientBackground.includes('rgba(217, 119, 6')) {
        return '#eab308'; // yellow-500
      }
      // FOOD category - green gradient
      else if (gradientBackground.includes('rgba(74, 222, 128') && gradientBackground.includes('rgba(22, 101, 52')) {
        return '#22c55e'; // green-500
      }
      // HEALTH category - cyan gradient
      else if (gradientBackground.includes('rgba(34, 211, 238') && gradientBackground.includes('rgba(14, 116, 144')) {
        return '#06b6d4'; // cyan-500
      }
    }

    // Default fallback
    return '#3b82f6'; // blue-500
  };

  // Dynamic content for subcategories
  const getSubCategoryContent = () => {
    const categoryContent = subCategoryContentMap[currentCategory];
    if (categoryContent && categoryContent[selectedSubCategory]) {
      return categoryContent[selectedSubCategory];
    }

    // Default fallback
    return {
      title: "Explore " + currentCategory,
      description:
        "Discover comprehensive resources and guidance for your wellness journey.",
      section2: {
        title: "Deepen Your Practice",
        description:
          "Take your understanding to the next level with advanced techniques and insights.",
      },
      section3: {
        title: "Transform Your Life",
        description:
          "Apply what you learn to create lasting positive changes in your daily life.",
      },
    };
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Top Header */}
        <nav
          className="bg-black text-white py-1.5 px-6 relative z-50"
          style={{ height: "50px" }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="font-righteous text-3xl">Lifestyle</div>
            <div className="flex items-center gap-6">
              <span className="underline text-sm">Subscribe</span>
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold">
                Log in
              </button>
            </div>
          </div>
        </nav>
        {/* Category Navigation */}
        <div
          className="relative max-h-[1000px] flex flex-col overflow-hidden"
          style={{ background: addOpacityToBackground(config.background, 0.8) }}
        >
          {/* Navigation Pills */}
          <div className="flex gap-2 py-3 shrink-0 max-w-7xl mx-auto w-full">
            {categoryPills.map((pill) => (
              <button
                key={pill.name}
                onClick={() => navigate(`/category/${pill.name.toLowerCase()}`)}
                className={`${pill.name === currentCategory ? `bg-gradient-to-r ${pill.colors} text-white ring-4 ring-white ring-inset` : "bg-black text-white hover:bg-gray-800 hover:ring-2 hover:ring-white hover:ring-inset"} rounded-xl flex-1 text-center cursor-pointer transition-all duration-200 hover:scale-105 font-semibold text-lg drop-shadow-lg`}
                style={{ height: "46px", padding: "9px 0" }}
              >
                {pill.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 lg:px-24 py-8 gap-8 min-h-0 overflow-y-auto">
              <div className="flex-1 max-w-2xl flex flex-col justify-center mt-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {config.hero.title}
                </h1>
                <h2 className="text-lg lg:text-xl font-semibold text-white mb-6">
                  {config.hero.subtitle}
                </h2>
                <p className="text-base lg:text-lg text-white mb-8 leading-relaxed h-[150px] w-[400px]">
                  {config.hero.description}
                </p>

                {/* Audio Player */}
                <div className="bg-white rounded-2xl p-4 w-[500px] mr-auto mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-1" fill="white" />
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

                <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl mr-auto"
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.filter = 'brightness(1)';
                  }}
                >
                  Try Lifestyle
                </button>
              </div>

              {/* Phone Mockup */}
              <div className="flex-shrink-0">
                <div className="relative w-[300px] h-80 bg-black rounded-3xl p-2">
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
            <div className="px-6 mt-20 lg:px-24 max-w-7xl mx-auto w-full flex-shrink-0">
              <div className="flex flex-wrap gap-3 pb-4">
                {config.subCategories.map((subCat) => (
                  <button
                    key={subCat.name}
                    onClick={() => setSelectedSubCategory(subCat.name)}
                    className={`px-4 py-2 rounded-full font-semibold text-base transition-all hover:scale-105 transform duration-200 ${selectedSubCategory === subCat.name
                      ? "bg-white text-black border-2 border-black"
                      : "bg-black text-white hover:bg-gray-800 hover:ring-2 hover:ring-white hover:ring-inset"
                      }`}
                  >
                    {subCat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white px-6 lg:px-24">
          {/* Feature Sections with gradient background */}
          <div
            className="flex flex-col justify-center items-center space-y-20 mb-20 px-6 lg:px-24 py-20 -mx-6 lg:-mx-24"
            style={{
              background:
                currentCategory === "SLEEP"
                  ? "linear-gradient(99deg, rgba(39, 165, 255, 0.7) 3.67%, rgba(67, 39, 255, 0.7) 91.7%)"
                  : addOpacityToBackground(config.background, 0.8),
            }}
          >
            {/* Section 1 */}
            <div className="flex flex-col lg:flex-row gap-12 w-[1000px]">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-white mb-6">
                  {getSubCategoryContent().title}
                </h3>
                <p className="text-xl text-white leading-relaxed">
                  {getSubCategoryContent().description}
                </p>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/9a1e701f6f94488ef701d75926439d7dbd80d143?width=1128"
                alt="Dream visualization"
                className="flex-shrink-0 w-full lg:w-96 h-64 object-cover rounded-3xl"
              />
            </div>

            {/* Section 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 w-[1000px] justify-center">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-white mb-6">
                  {getSubCategoryContent().section2.title}
                </h3>
                <p className="text-xl text-white leading-relaxed">
                  {getSubCategoryContent().section2.description}
                </p>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/3311da80a30f20b1fea8c4d496d0feb16d8e2c94?width=1128"
                alt="Mind mastery"
                className="flex-shrink-0 w-full lg:w-96 h-64 object-cover rounded-3xl"
              />
            </div>

            {/* Section 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 w-[1000px] justify-center">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-white mb-6">
                  {getSubCategoryContent().section3.title}
                </h3>
                <p className="text-xl text-white leading-relaxed">
                  {getSubCategoryContent().section3.description}
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
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-black">
                  Last Articles on {selectedSubCategory || config.title}
                </h2>
                <div className="flex gap-2">
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              {carouselLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="w-full h-56 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {latestArticles.map((article, index) => (
                    <div key={article.id || index} className="group cursor-pointer">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-56 object-cover rounded-2xl mb-4"
                      />
                      <p className="ml-1 text-sm font-medium text-gray-400 mb-1.5">
                        {article.subsection}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="ml-1 text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                            {article.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{article.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Most Popular Articles */}
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-black">
                  Most Popular Articles on {selectedSubCategory || config.title}
                </h2>
                <div className="flex gap-2">
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              {carouselLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="w-full h-56 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularArticles.map((article, index) => (
                    <div key={article.id || index} className="group cursor-pointer">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-56 object-cover rounded-2xl mb-4"
                      />
                      <p className="ml-1 text-sm font-medium text-gray-400 mb-2">
                        {article.subsection}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="ml-1 text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                            {article.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{article.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Here some cool articles */}
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-black">
                  Cool {selectedSubCategory || config.title} Articles
                </h2>
                <div className="flex gap-2">
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              {carouselLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="w-full h-56 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coolArticles.map((article, index) => (
                    <div key={article.id || index} className="group cursor-pointer">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-56 object-cover rounded-2xl mb-4"
                      />
                      <p className="ml-1 text-sm font-medium text-gray-400 mb-1.5">
                        {article.subsection}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="ml-1 text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                            {article.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{article.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* All Articles */}
            <div className="py-20 max-w-7xl mx-auto">
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
              {gridLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                    <div key={i} className="animate-pulse mb-4">
                      <div className="w-full h-56 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {allArticles.map((article, index) => (
                    <div key={article.id || index} className="mb-4 group cursor-pointer">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-56 object-cover rounded-2xl mb-4"
                      />
                      <p className="ml-1 text-sm font-medium text-gray-400 mb-1.5">
                        {article.subsection}
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="ml-1 text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                            {article.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{article.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-end gap-4">
                <span className="text-3xl font-medium">
                  {currentPage}/{Math.ceil(totalArticlesCount / 16) || 1}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalArticlesCount / 16)}
                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white py-6 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-8 mb-8 lg:mb-0">
                <span className="text-white">© 2025 Scientologic Inc.</span>
                <a href="#" className="text-white underline hover:text-gray-300">
                  Terms & conditions
                </a>
                <a href="#" className="text-white underline hover:text-gray-300">
                  Privacy policy
                </a>
                <a href="#" className="text-white underline hover:text-gray-300">
                  Consumer Health Data
                </a>
                <a href="#" className="text-white underline hover:text-gray-300">
                  CA Privacy Notice
                </a>
              </div>
              <div className="flex items-center gap-4 border-4 border-white rounded-full px-6 py-3">
                <span className="text-white text-xl">🌐</span>
                <span className="text-white text-xl">English</span>
                <ChevronRight
                  className="text-white transform rotate-90"
                  size={24}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}