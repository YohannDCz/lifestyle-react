import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Check, Globe } from "lucide-react";
import {
  fetchArticlesBySection,
  fetchTrendingBySection,
  ArticleWithContent,
} from "../lib/articleService";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Growth Tracking");
  const [activeCategory, setActiveCategory] = useState("SLEEP");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLifestyleSlide, setCurrentLifestyleSlide] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [realArticles, setRealArticles] = useState<{
    [key: string]: ArticleWithContent[];
  }>({});
  const [trendingArticles, setTrendingArticles] = useState<{
    [key: string]: string[];
  }>({});
  const [sleepArticlesPage, setSleepArticlesPage] = useState(0);
  const [mindArticlesPage, setMindArticlesPage] = useState(0);

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

  const categoryMenuContent = {
    SLEEP: {
      title: "SLEEP",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-800",
      items: [
        "Lucid Dreams",
        "Sleep Types",
        "Sleep Quality",
        "Daily Routines",
        "Technology",
      ],
      articles: [
        {
          title: "How to induce lucid dreams",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "How to make the dreams last",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Modes in lucid dreaming",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "The Star Wars mode",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Relaxation",
        "Sleep patterns",
        "How to fall asleep faster?",
        "Why do I wake up tired?",
        "How do get better sleep",
        "What to eat before bed",
        "How to fall back to sleep",
        "How to stay asleep",
      ],
    },
    MIND: {
      title: "MIND",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-800",
      items: [
        "Mindfulness",
        "Visualization",
        "Inner Peace",
        "Focused Mind",
        "Guided Meditation",
      ],
      articles: [
        {
          title: "How to become mindful in a month",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640",
        },
        {
          title: "Visualize the entire universe with the power of meditation",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640",
        },
        {
          title: "Develop your self love",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640",
        },
        {
          title: "How to leverage the true power of your mind",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/0e1570560c85ecb3ec6227ab0d36582259f4d337?width=640",
        },
      ],
      trending: [
        "Meditation basics",
        "Mindful breathing",
        "Concentration techniques",
        "Mental clarity",
        "Focus exercises",
        "Visualization guides",
        "Inner peace practices",
        "Mindful living",
      ],
    },
    MENTAL: {
      title: "MENTAL",
      color: "bg-pink-500",
      gradient: "from-pink-400 to-pink-800",
      items: [
        "Emotional Balance",
        "Anxiety Relief",
        "Positive Thinking",
        "Cognitive Reset",
        "Inner Strength",
      ],
      articles: [
        {
          title: "Managing anxiety in daily life",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Building emotional resilience",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Positive thinking techniques",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Mental reset strategies",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Stress management",
        "Mental health",
        "Emotional wellness",
        "Anxiety support",
        "Mood boosters",
        "Cognitive training",
        "Mental clarity",
        "Emotional intelligence",
      ],
    },
    SOUL: {
      title: "SOUL",
      color: "bg-red-500",
      gradient: "from-red-400 to-red-800",
      items: [
        "Social Dynamics",
        "Soulmate",
        "Sexuality",
        "Friendship",
        "Family",
      ],
      articles: [
        {
          title: "Building meaningful relationships",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Understanding social connections",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Family relationship dynamics",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Strengthening friendships",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Relationship advice",
        "Social skills",
        "Love and connection",
        "Family harmony",
        "Friendship tips",
        "Communication",
        "Emotional intimacy",
        "Social wellness",
      ],
    },
    BODY: {
      title: "BODY",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-800",
      items: ["Strength", "Flexibility", "Cardio", "Recovery", "Sports"],
      articles: [
        {
          title: "Building functional strength",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Flexibility and mobility routines",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Cardio training fundamentals",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Recovery and rest strategies",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Workout routines",
        "Fitness goals",
        "Exercise motivation",
        "Body transformation",
        "Athletic performance",
        "Physical wellness",
        "Training tips",
        "Recovery methods",
      ],
    },
    BRAIN: {
      title: "BRAIN",
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-yellow-800",
      items: ["Mnemonics", "MindMap", "Speed Reading", "GPTpedia", "Tools"],
      articles: [
        {
          title: "Memory enhancement techniques",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Effective mind mapping",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Speed reading mastery",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Brain training tools",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Learning techniques",
        "Memory improvement",
        "Cognitive enhancement",
        "Brain training",
        "Study methods",
        "Mental performance",
        "Information processing",
        "Learning optimization",
      ],
    },
    FOOD: {
      title: "FOOD",
      color: "bg-green-500",
      gradient: "from-green-400 to-green-800",
      items: [
        "Nutrition",
        "World Cuisine",
        "Special Diets",
        "Snacks",
        "Creative",
      ],
      articles: [
        {
          title: "Nutritional fundamentals",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Exploring world cuisines",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Healthy eating habits",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Cultural food traditions",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Healthy recipes",
        "Nutritional guides",
        "Diet tips",
        "Cooking techniques",
        "Food culture",
        "Mindful eating",
        "Nutrition facts",
        "Meal planning",
      ],
    },
    HEALTH: {
      title: "HEALTH",
      color: "bg-cyan-500",
      gradient: "from-cyan-400 to-cyan-800",
      items: ["Wellness", "Prevention", "Recovery", "Balance", "Vitality"],
      articles: [
        {
          title: "Holistic health approaches",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Preventive health measures",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Health and wellness balance",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
        {
          title: "Vitality and longevity",
          image:
            "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484",
        },
      ],
      trending: [
        "Wellness tips",
        "Health optimization",
        "Preventive care",
        "Healthy lifestyle",
        "Medical insights",
        "Health monitoring",
        "Wellness strategies",
        "Health education",
      ],
    },
  };

  const categoryContent = {
    SLEEP: {
      title: "Rejuvenate",
      color: "bg-blue-400",
      borderColor: "border-blue-400",
      content: [
        "Rejuvenate your body and mind by prioritizing restful sleep and delving into the fascinating realm of dreams. Quality sleep restores your energy, boosts cognitive function, and supports emotional balance, creating the foundation for everything you do.",
        "Beyond just resting, explore lucid dreaming to unlock your subconscious creativity and navigate the dream world with intention. Establish a bedtime ritual that calms the body and signals the mind to unwind.",
        "From optimizing your sleep environment to embracing mindfulness techniques that prepare you for slumber, rejuvenation starts with giving yourself permission to rest fully and deeply.",
      ],
    },
    MIND: {
      title: "Refocus",
      color: "bg-purple-400",
      borderColor: "border-purple-400",
      content: [
        "Refocus your mental energy through the practice of meditation. In a world filled with distractions, finding stillness is a superpower. Meditation helps quiet the mind, sharpening your ability to concentrate and bringing your attention to the present moment.",
        "By practicing daily, you cultivate resilience to stress and a greater capacity for emotional regulation. Begin with guided meditations that take you on a journey of calm and clarity.",
        "Whether it's visualizing the vastness of the universe or simply focusing on your breath, meditation reconnects you with your inner self and paves the way for purposeful living.",
      ],
    },
    MENTAL: {
      title: "Rebalance",
      color: "bg-pink-400",
      borderColor: "border-pink-400",
      content: [
        "Rebalance your emotional and mental well-being by fostering awareness of your thoughts and feelings. Life's challenges can often leave you feeling overwhelmed, but building a toolkit of coping strategies helps you navigate with confidence.",
        "Techniques like journaling, gratitude exercises, and mindfulness can transform negative thought patterns into constructive energy. By addressing stress and anxiety, you create space for inner peace and emotional stability.",
        "Rebalancing is about understanding yourself deeply, embracing your vulnerabilities, and strengthening your ability to adapt and grow through life's complexities.",
      ],
    },
    SOUL: {
      title: "Reconnect",
      color: "bg-red-400",
      borderColor: "border-red-400",
      content: [
        "Reconnect with the people who matter most and nurture meaningful relationships. Human connection is a powerful source of joy, support, and growth. Begin by actively listening to others and expressing empathy, ensuring that your interactions are authentic and valuable.",
        "Strengthen bonds by dedicating time to loved ones and creating moments of shared joy. Explore ways to deepen intimacy, improve communication, and resolve conflicts constructively.",
        "Relationships thrive when built on trust, understanding, and love. Reconnecting allows you to grow not only as an individual but as part of a network of mutual care and encouragement.",
      ],
    },
    BODY: {
      title: "Reenergize",
      color: "bg-orange-400",
      borderColor: "border-orange-400",
      content: [
        "Reenergize your body with regular physical activity and a commitment to self-discipline. Physical fitness is not just about appearance but about building strength, resilience, and vitality.",
        "Whether it's through weightlifting, running, yoga, or martial arts, find a routine that challenges and excites you. Proper nutrition and hydration play an equally important role in sustaining your energy levels.",
        "Monitor your progress, celebrate milestones, and push past limits to uncover your potential. Reenergizing transforms your body into a vessel of strength and endurance, empowering you to approach life's challenges with vigor and confidence.",
      ],
    },
    BRAIN: {
      title: "Reinvent",
      color: "bg-yellow-400",
      borderColor: "border-yellow-400",
      content: [
        "Reinvent yourself by embracing a lifelong journey of learning and exploration. Each day is an opportunity to expand your knowledge, develop new skills, and redefine what's possible.",
        "Dive into books, courses, and experiences that challenge your understanding and spark your curiosity. Experiment with different tools like mind mapping, memory techniques, or time management strategies to optimize your learning.",
        "Reinvention is about staying open to change, breaking old patterns, and becoming the best version of yourself. In doing so, you set the stage for a future rich with innovation, creativity, and personal growth.",
      ],
    },
    FOOD: {
      title: "Refuel",
      color: "bg-green-400",
      borderColor: "border-green-400",
      content: [
        "Refuel your body by embracing the power of mindful nourishment. Food is not just fuel; it is the foundation of your energy, vitality, and overall well-being. Prioritize whole, nutrient-dense ingredients that rejuvenate your body and enhance your mental clarity.",
        "Make each meal an intentional act of self-care, choosing foods that support both short-term energy and long-term health. Explore cooking as an art form, experimenting with vibrant flavors, textures, and cuisines to create meals that excite and satisfy.",
        "Cultivate an awareness of how food impacts your physical and emotional state, turning every bite into an opportunity to recharge. By refueling with purpose, you empower yourself to thrive in every aspect of life.",
      ],
    },
    HEALTH: {
      title: "Restore",
      color: "bg-cyan-400",
      borderColor: "border-cyan-400",
      content: [
        "Restore balance and harmony to your overall well-being by focusing on your health. True health is a dynamic interplay between physical, mental, and emotional wellness. Regular health checkups and preventive care are key to staying ahead of potential challenges.",
        "Learn to listen to your body's signals, whether it's through physical symptoms, energy levels, or mood changes. Practice stress management techniques like yoga, breathwork, and relaxation exercises to maintain equilibrium.",
        "Commit to a lifestyle that supports longevity—adequate hydration, a nutrient-rich diet, quality sleep, and consistent movement. By making health a priority, you lay the foundation for a vibrant, fulfilling life where you can thrive at your fullest potential.",
      ],
    },
  };

  const currentContent = categoryContent[activeCategory];
  const totalSlides = currentContent.content.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  };

  const nextLifestyleSlide = () => {
    const nextIndex = (currentLifestyleSlide + 1) % lifestyleContent.length;
    setCurrentLifestyleSlide(nextIndex);
    setActiveTab(tabs[nextIndex]);
  };

  const prevLifestyleSlide = () => {
    const prevIndex =
      currentLifestyleSlide === 0
        ? lifestyleContent.length - 1
        : currentLifestyleSlide - 1;
    setCurrentLifestyleSlide(prevIndex);
    setActiveTab(tabs[prevIndex]);
  };

  const tabs = [
    "Growth Tracking",
    "Expert-led programs",
    "AI Guidance",
    "Dreams Genesis",
    "Mental Reset",
  ];

  const lifestyleContent = [
    {
      title: "Track your progress",
      subtitle: "Growth Tracking",
      description:
        "Explore the growth tracker as you make more and more improvements throughout the entire lifestyle rehabilitation process.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/980bff91973aff50ef58da5eecca8cb33f48718f?width=2640",
    },
    {
      title: "Masterclasses from the top",
      subtitle: "Expert-led Programs",
      description:
        "Access curated courses and guidance from world-class experts in their respective fields.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/980bff91973aff50ef58da5eecca8cb33f48718f?width=2640",
    },
    {
      title: "Intelligence is yours",
      subtitle: "AI Guidance",
      description:
        "Receive personalized insights and recommendations through AI-driven tools to accelerate your journey.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/980bff91973aff50ef58da5eecca8cb33f48718f?width=2640",
    },
    {
      title: "Pathway to lucid dreaming",
      subtitle: "Dream Genesis",
      description:
        "Explore the art of lucid dreaming and unlock the creative potential of your subconscious mind.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/980bff91973aff50ef58da5eecca8cb33f48718f?width=2640",
    },
    {
      title: "Restart all over",
      subtitle: "Mind Reset",
      description:
        "Clear your mind and begin fresh with powerful techniques to reset your mental state and approach life with renewed clarity.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/980bff91973aff50ef58da5eecca8cb33f48718f?width=2640",
    },
  ];

  const allSleepArticles = [
    {
      title: "How to make the dreams last",
      category: "Lucid Dreams",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640",
    },
    {
      title: "What is your sleep type?",
      category: "Sleep types",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640",
    },
    {
      title: "How to have a clean sleep at night",
      category: "Sleep quality",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640",
    },
    {
      title: "Have your own daily routine!",
      category: "Daily routines",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d6e0ebad917a70f558053bd9d267119197182adf?width=640",
    },
    {
      title: "Understanding sleep cycles",
      category: "Sleep science",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640",
    },
    {
      title: "Best sleep positions for health",
      category: "Sleep health",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640",
    },
    {
      title: "Creating the perfect sleep environment",
      category: "Sleep optimization",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640",
    },
    {
      title: "Sleep tracking technology guide",
      category: "Sleep tech",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d6e0ebad917a70f558053bd9d267119197182adf?width=640",
    },
  ];

  const sleepArticles = allSleepArticles.slice(sleepArticlesPage * 4, (sleepArticlesPage + 1) * 4);

  const allMindArticles = [
    {
      title: "How to become mindful in a month",
      category: "Mindfulness",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640",
    },
    {
      title: "Visualize the entire universe with the power of meditation",
      category: "Visualization",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640",
    },
    {
      title: "Develop your self love",
      category: "Inner peace",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640",
    },
    {
      title: "How to leverage the true power of your mind",
      category: "Focused mind",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0e1570560c85ecb3ec6227ab0d36582259f4d337?width=640",
    },
    {
      title: "Advanced meditation techniques",
      category: "Deep practice",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640",
    },
    {
      title: "Breathing exercises for clarity",
      category: "Breathwork",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640",
    },
    {
      title: "Mindful eating practices",
      category: "Mindful living",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640",
    },
    {
      title: "Mental focus training",
      category: "Concentration",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0e1570560c85ecb3ec6227ab0d36582259f4d337?width=640",
    },
  ];

  const mindArticles = allMindArticles.slice(mindArticlesPage * 4, (mindArticlesPage + 1) * 4);

  const experts = [
    {
      name: "Dr. Camille Durand",
      description:
        "Psychiatrist\nGraduated from Oxford\nSpecialist in Mental Health",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a0984178998544c162eacbb6ea6be1bbb0227f1d?width=640",
    },
    {
      name: "Dr. Adrian Leclerc",
      description:
        "Psychologist from Harvard\nCertified OWSLA\nSpecialist in Sleep Health",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/848141448b99503dfad648fd1dc6355ccd595c07?width=640",
    },
    {
      name: "Lama Tenzin Norbu",
      description: "Tibetan Master\nSpecialist in Mind Arts & Visual Thinking",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/22c01e42f78266551811feb74a25354d677081f2?width=640",
    },
    {
      name: "Pr. Isabelle Fournier",
      description:
        "Professor in technical mnemonic\nGrand Champion of the World Mnemonic Contest in 2014",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/c61e0c48d600823f4cfeccec8429bde48a5da170?width=640",
    },
  ];

  const testimonials = [
    {
      text: "I appreciate the consistent reminders to be kind and patient with myself as I learn and practice daily habits that are helping me find a calmer daily space.",
      author: "Member on forming more helpful habits",
    },
    {
      text: "Headspace helped me begin the process of stepping back from toxic thinking and being a part of something bigger than my own personal grievances.",
      author: "Member on learning to think in more helpful ways",
    },
    {
      text: "The strategies in the courses allow me to work on a part of myself that I am struggling with. Headspace changed the relationship I have with myself.",
      author: "Member on working through their feelings",
    },
  ];

  const pricingPlans = [
    {
      name: "Plus Plan",
      price: "200",
      features: [
        "All tools",
        "All articles",
        "All audios",
        "AI Guided Sessions",
      ],
      guarantees: [
        "Improved mental condition",
        "Sufficient learning material",
        "Restful sleep",
      ],
      buttonText: "Your current plan",
      buttonStyle: "border border-black bg-white text-black",
    },
    {
      name: "Pro Plan",
      price: "20",
      features: [
        "Weekly video coaching session",
        "Personalized learning paths",
        "Advanced analytics and insight",
      ],
      guarantees: [
        "Faster mindfulness development",
        "Faster growth across all area of life",
        "Regular lucid dreaming",
      ],
      buttonText: "Get Pro",
      buttonStyle: "bg-black text-white",
    },
    {
      name: "Max Plan",
      price: "2000",
      features: [
        "Daily coaching sessions",
        "Meditation visualization",
        "Access to dream universes",
      ],
      guarantees: [
        "Your personal dream shelter",
        "Visualization of the universe",
        "Always synced chakras",
      ],
      buttonText: "Get Max",
      buttonStyle: "bg-black text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
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

      {/* Category Pills Navigation */}
      <div className="bg-gray-600 relative z-40">
        <div className="bg-gray-800/90 py-3" style={{ height: "70px" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="flex flex-row gap-2 justify-between"
              onMouseEnter={() => {
                // Clear timeout when entering navigation area
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout);
                  setHoverTimeout(null);
                }
              }}
              onMouseLeave={() => {
                // Only hide when leaving the entire navigation area
                const timeout = setTimeout(() => {
                  if (!document.querySelector(".hover-menu-overlay:hover")) {
                    setShowHoverMenu(false);
                    setHoveredCategory(null);
                  }
                }, 100);
                setHoverTimeout(timeout);
              }}
            >
              {categoryPills.map((pill, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${pill.colors} rounded-xl flex-1 text-center cursor-pointer transition-transform duration-200 hover:scale-105`}
                  style={{ height: "46px", padding: "9px 0" }}
                  onMouseEnter={() => {
                    // Clear any existing timeout
                    if (hoverTimeout) {
                      clearTimeout(hoverTimeout);
                      setHoverTimeout(null);
                    }
                    setHoveredCategory(pill.name);
                    setShowHoverMenu(true);
                  }}
                >
                  <span className="text-white font-semibold text-lg drop-shadow-lg">
                    {pill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Hover Menu Overlay */}
      {showHoverMenu && hoveredCategory && (
        <div
          className="hover-menu-overlay fixed inset-0 z-50 bg-black"
          style={{
            top: "120px", // Account for navigation bars
            height: "calc(100vh - 120px)",
          }}
          onMouseLeave={() => {
            // Clear any existing timeout
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
              setHoverTimeout(null);
            }
            setShowHoverMenu(false);
            setHoveredCategory(null);
          }}
        >
          <div className="h-full flex">
            {/* Left Menu Section */}
            <div className="w-80 p-6 flex flex-col">
              <div className="mb-8">
                {categoryMenuContent[hoveredCategory]?.items.map(
                  (item, index) => (
                    <div key={index} className="mb-4">
                      {index === 0 ? (
                        <div
                          className={`bg-gradient-to-r ${categoryMenuContent[hoveredCategory].gradient} text-white px-6 py-3 rounded-full text-lg font-semibold inline-block`}
                        >
                          {item}
                        </div>
                      ) : (
                        <div className="bg-white px-6 py-3 rounded-full text-lg font-semibold border border-gray-200 inline-block">
                          <span
                            className={`bg-gradient-to-r ${categoryMenuContent[hoveredCategory].gradient} bg-clip-text text-transparent`}
                          >
                            {item}
                          </span>
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>

              <div className="mt-auto">
                <div className="bg-gray-500 text-white px-6 py-4 rounded-full text-lg font-semibold inline-block">
                  Explore {hoveredCategory}
                </div>
              </div>
            </div>

            {/* Center Articles Section */}
            <div className="flex-1 p-6">
              <h2 className="text-white text-2xl font-semibold mb-8">
                Top articles
              </h2>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {categoryMenuContent[hoveredCategory]?.articles
                  .slice(0, 3)
                  .map((article, index) => (
                    <div key={index} className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-2xl border border-gray-300"
                      />
                      <div className="absolute bottom-4 right-4">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${categoryMenuContent[hoveredCategory].gradient} flex items-center justify-center`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.43 5.93L20.5 12L14.43 18.07L13.02 16.66L17.17 12.5H3.5V11.5H17.17L13.02 7.34L14.43 5.93Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-white text-lg font-semibold mt-4">
                        {article.title}
                      </h3>
                    </div>
                  ))}
              </div>

              {categoryMenuContent[hoveredCategory]?.articles.length > 3 && (
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <img
                      src={
                        categoryMenuContent[hoveredCategory].articles[3].image
                      }
                      alt={
                        categoryMenuContent[hoveredCategory].articles[3].title
                      }
                      className="w-60 h-40 object-cover rounded-2xl border border-gray-300"
                    />
                    <div className="absolute bottom-4 right-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${categoryMenuContent[hoveredCategory].gradient} flex items-center justify-center`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.43 5.93L20.5 12L14.43 18.07L13.02 16.66L17.17 12.5H3.5V11.5H17.17L13.02 7.34L14.43 5.93Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-white text-lg font-semibold mt-4">
                      {categoryMenuContent[hoveredCategory].articles[3].title}
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Right Trending Section */}
            <div className="w-80 p-6">
              <h2 className="text-white text-2xl font-semibold mb-8">
                Trending
              </h2>
              <div className="space-y-4">
                {categoryMenuContent[hoveredCategory]?.trending.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="text-white text-lg underline cursor-pointer hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "calc(100vh - 70px - 50px)",
        }}
      >
        {/* Background Video */}
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            width: "100vw",
            height: "100vh",
            transform: "scale(1.2)",
            pointerEvents: "none",
          }}
          src="https://www.youtube.com/embed/caiHvJbLC-w?autoplay=1&mute=1&loop=1&playlist=caiHvJbLC-w&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=20&end=264"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        {/* Dark overlay for better text readability */}
        <a
          href="https://youtu.be/caiHvJbLC-w?si=_T5PkpUrG4hyT_NS"
          className="absolute inset-0 bg-black/30 z-10 cursor-pointer flex"
        ></a>
        <div
          className="relative z-10 text-center text-white max-w-4xl"
          style={{ margin: "0 auto 0 250px" }}
        >
          <div className="mb-8">
            <h1
              className="font-roboto text-6xl md:text-7xl lg:text-8xl font-medium text-left"
              style={{ marginRight: "auto" }}
            >
              Website of
            </h1>
            <h1
              className="font-shrikhand text-6xl md:text-7xl lg:text-8xl text-right"
              style={{ marginRight: "auto" }}
            >
              dynamic
            </h1>
            <h1
              className="font-roboto text-6xl md:text-7xl lg:text-8xl font-medium"
              style={{ margin: "-10px auto 0 0" }}
            >
              energies
            </h1>
          </div>

          <p
            className="text-xl font-medium max-w-2xl text-left"
            style={{ margin: "0 auto 16px", paddingTop: "12px" }}
          >
            From one habit to an entire routine system. Let lifestyle.com change
            your life!
          </p>

          <p
            className="text-base max-w-2xl text-left"
            style={{ margin: "0 auto 32px" }}
          >
            Lifestyle is lucid dreams, mindfulness, a healthy mental, body &
            brain, and balanced diet & relationships.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-start items-center"
            style={{ paddingTop: "12px" }}
          >
            <button
              className="bg-gradient-to-r from-cyan-400 to-white text-black px-12 py-6 rounded-full text-xl font-medium"
              style={{ width: "190px" }}
            >
              Plus Plan
            </button>
            <button
              className="bg-gradient-to-r from-purple-400 to-white text-black px-12 py-6 rounded-full text-xl font-medium"
              style={{ width: "190px" }}
            >
              Pro Plan
            </button>
          </div>
        </div>
      </div>

      {/* Star Categories Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/fc240d1217d36251709ceffd44696097607a9771?width=2892')`,
          height: "958px",
          padding: "80px 0 96px",
        }}
      >
        {/* Sparkles */}
        <div className="absolute top-8 left-24">
          <svg width="120" height="120" viewBox="0 0 160 160" fill="none">
            <path
              d="M76.2501 36.1718C77.0535 36.1718 77.4555 35.703 77.6564 34.9664C79.7321 23.7832 79.5984 23.5155 91.2501 21.3055C92.0535 21.1718 92.5224 20.703 92.5224 19.8992C92.5224 19.0958 92.0535 18.627 91.2501 18.493C79.6653 16.1495 80.0001 15.8815 77.6564 4.83238C77.4555 4.09581 77.0535 3.62695 76.2501 3.62695C75.4464 3.62695 75.0447 4.09581 74.8438 4.83238C72.5001 15.8815 72.9018 16.1495 61.2501 18.493C60.5135 18.627 59.9778 19.0958 59.9778 19.8992C59.9778 20.703 60.5135 21.1718 61.2501 21.3055C72.9018 23.6495 72.7678 23.7832 74.8438 34.9664C75.0447 35.703 75.4464 36.1718 76.2501 36.1718ZM43.8395 82.2432C45.1118 82.2432 45.9824 81.4395 46.1161 80.2344C48.527 62.3547 49.1295 62.3547 67.6118 58.8058C68.8173 58.6047 69.6875 57.8012 69.6875 56.5289C69.6875 55.3235 68.8173 54.4529 67.6118 54.2521C49.1295 51.7075 48.4598 51.1047 46.1161 32.8904C45.9824 31.6852 45.1118 30.8147 43.8395 30.8147C42.6341 30.8147 41.7635 31.6852 41.6295 32.9575C39.4198 50.9038 38.4821 50.8369 20.1341 54.2521C18.9287 54.5201 18.0581 55.3235 18.0581 56.5289C18.0581 57.8681 18.9287 58.6047 20.4018 58.8058C38.6161 61.7521 39.4198 62.2209 41.6295 80.1004C41.7635 81.4395 42.6341 82.2432 43.8395 82.2432ZM89.2413 156.373C90.9824 156.373 92.2547 155.1 92.5893 153.292C97.3438 116.596 102.5 111.038 138.795 107.02C140.67 106.819 141.942 105.413 141.942 103.672C141.942 101.931 140.67 100.591 138.795 100.324C102.5 96.3055 97.3438 90.7475 92.5893 54.0512C92.2547 52.2432 90.9824 51.0378 89.2413 51.0378C87.5001 51.0378 86.2278 52.2432 85.9601 54.0512C81.2055 90.7475 75.9824 96.3055 39.7544 100.324C37.8127 100.591 36.5404 101.931 36.5404 103.672C36.5404 105.413 37.8127 106.819 39.7544 107.02C75.9153 111.774 80.9375 116.663 85.9601 153.292C86.2278 155.1 87.5001 156.373 89.2413 156.373Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="absolute top-8 right-24">
          <svg width="120" height="120" viewBox="0 0 160 160" fill="none">
            <path
              d="M83.7499 123.828C82.9465 123.828 82.5445 124.297 82.3436 125.034C80.2679 136.217 80.4016 136.484 68.7499 138.694C67.9465 138.828 67.4776 139.297 67.4776 140.101C67.4776 140.904 67.9465 141.373 68.7499 141.507C80.3347 143.85 79.9999 144.118 82.3436 155.168C82.5445 155.904 82.9465 156.373 83.7499 156.373C84.5536 156.373 84.9553 155.904 85.1562 155.168C87.4999 144.118 87.0982 143.85 98.7499 141.507C99.4865 141.373 100.022 140.904 100.022 140.101C100.022 139.297 99.4865 138.828 98.7499 138.694C87.0982 136.35 87.2322 136.217 85.1562 125.034C84.9553 124.297 84.5536 123.828 83.7499 123.828ZM116.16 77.7568C114.888 77.7568 114.018 78.5605 113.884 79.7656C111.473 97.6453 110.87 97.6453 92.3882 101.194C91.1827 101.395 90.3125 102.199 90.3125 103.471C90.3125 104.676 91.1827 105.547 92.3882 105.748C110.87 108.292 111.54 108.895 113.884 127.11C114.018 128.315 114.888 129.185 116.16 129.185C117.366 129.185 118.236 128.315 118.37 127.042C120.58 109.096 121.518 109.163 139.866 105.748C141.071 105.48 141.942 104.676 141.942 103.471C141.942 102.132 141.071 101.395 139.598 101.194C121.384 98.2479 120.58 97.7791 118.37 79.8996C118.236 78.5605 117.366 77.7568 116.16 77.7568ZM70.7587 3.62735C69.0176 3.62735 67.7453 4.89963 67.4107 6.70763C62.6562 43.4042 57.4999 48.9622 21.2053 52.9802C19.3302 53.1811 18.0579 54.5873 18.0579 56.3282C18.0579 58.0693 19.3302 59.4088 21.2053 59.6765C57.4999 63.6945 62.6562 69.2525 67.4107 105.949C67.7453 107.757 69.0176 108.962 70.7587 108.962C72.4999 108.962 73.7722 107.757 74.0399 105.949C78.7945 69.2525 84.0176 63.6945 120.246 59.6765C122.187 59.4088 123.46 58.0693 123.46 56.3282C123.46 54.5873 122.187 53.1811 120.246 52.9802C84.0847 48.2256 79.0625 43.3371 74.0399 6.70763C73.7722 4.89963 72.4999 3.62735 70.7587 3.62735Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-semibold mb-12">
            See our star categories
          </h2>

          {/* Circular Category Interface */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              {/* Main circle */}
              <div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                style={{ width: "672px" }}
              ></div>

              {/* Center content */}
              <div className="absolute inset-1/4 bg-white rounded-full flex flex-col items-center justify-center text-black">
                <div
                  className="flex flex-col px-8 relative w-full h-full"
                  style={{ gap: "12px" }}
                >
                  <div
                    className={`${currentContent.color} text-black px-5 py-2 rounded-full text-lg font-medium`}
                    style={{ margin: "16px auto 0" }}
                  >
                    {activeCategory}
                  </div>

                  {/* Carousel Content */}
                  <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative h-48">
                      <div
                        className="flex transition-transform duration-300 ease-in-out h-full"
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        {currentContent.content.map((text, index) => (
                          <div
                            key={index}
                            className="w-full flex-shrink-0 flex flex-col justify-center"
                          >
                            <p className="text-sm leading-relaxed text-black text-center">
                              <span style={{ color: "rgba(0, 0, 0, 1)" }}>
                                {index === 0 && (
                                  <>
                                    <em style={{ color: "rgba(0, 0, 0, 1)" }}>
                                      <b>{currentContent.title}</b>
                                    </em>{" "}
                                  </>
                                )}
                                <span style={{ width: "100%" }}>{text}</span>
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slide indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                      {currentContent.content.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentSlide
                              ? "bg-gray-800"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    className="rounded-lg mx-auto underline"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      color: "rgba(0, 0, 0, 1)",
                      fontWeight: "600",
                      margin: "0 auto 12px",
                      padding: "0 24px",
                    }}
                  >
                    See More
                  </button>
                </div>

                {/* Navigation arrows for carousel */}
                <button
                  onClick={prevSlide}
                  className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Category pills around the circle - positioned in perfect 672px circle at 45-degree intervals starting with Mind */}
              {/* Mind - 0 degrees (top) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateY(-336px)",
                }}
                onMouseEnter={() => handleCategoryHover("MIND")}
              >
                <span
                  className={`bg-purple-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "MIND" ? "scale-110 shadow-lg" : ""}`}
                >
                  Mind
                </span>
              </div>
              {/* Mental - 45 degrees (top-right) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translate(238px, -238px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("MENTAL");
                  setHoveredCategory("MENTAL");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-pink-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "MENTAL" ? "scale-110 shadow-lg" : ""}`}
                >
                  Mental
                </span>
              </div>
              {/* Soul - 90 degrees (right) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateX(336px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("SOUL");
                  setHoveredCategory("SOUL");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-red-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "SOUL" ? "scale-110 shadow-lg" : ""}`}
                >
                  Soul
                </span>
              </div>
              {/* Body - 135 degrees (bottom-right) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translate(238px, 238px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("BODY");
                  setHoveredCategory("BODY");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-orange-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "BODY" ? "scale-110 shadow-lg" : ""}`}
                >
                  Body
                </span>
              </div>
              {/* Brain - 180 degrees (bottom) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateY(336px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("BRAIN");
                  setHoveredCategory("BRAIN");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-yellow-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "BRAIN" ? "scale-110 shadow-lg" : ""}`}
                >
                  Brain
                </span>
              </div>
              {/* Food - 225 degrees (bottom-left) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translate(-238px, 238px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("FOOD");
                  setHoveredCategory("FOOD");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-green-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "FOOD" ? "scale-110 shadow-lg" : ""}`}
                >
                  Food
                </span>
              </div>
              {/* Health - 270 degrees (left) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateX(-336px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("HEALTH");
                  setHoveredCategory("HEALTH");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-cyan-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "HEALTH" ? "scale-110 shadow-lg" : ""}`}
                >
                  Health
                </span>
              </div>
              {/* Sleep - 315 degrees (top-left) */}
              <div
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translate(-238px, -238px)",
                }}
                onMouseEnter={() => {
                  handleCategoryHover("SLEEP");
                  setHoveredCategory("SLEEP");
                  setShowHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (!document.querySelector(".fixed.inset-0:hover")) {
                      setShowHoverMenu(false);
                      setHoveredCategory(null);
                    }
                  }, 100);
                }}
              >
                <span
                  className={`bg-blue-400 text-black px-6 py-2 rounded-full text-lg transition-all duration-200 hover:scale-110 ${activeCategory === "SLEEP" ? "scale-110 shadow-lg" : ""}`}
                >
                  Sleep
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Lifestyle Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16">
            Your lifestyle <br />
            right at your fingerprints
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-start mb-12 items-center">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentLifestyleSlide(index);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-visible">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentLifestyleSlide * 82}%)`,
                gap: "12px",
                width: "100%",
                margin: "0 32px"
              }}
            >
              {lifestyleContent.map((content, index) => (
                <div key={index} className="flex-shrink-0" style={{ width: "90%" }}>
                  <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-3xl relative overflow-hidden flex flex-row px-8">
                    <img
                      src={content.image}
                      alt="Lifestyle tracking interface"
                      className="rounded-2xl absolute top-0 left-0 z-0 w-full h-full"
                    />
                    <div className="flex">
                      <div className="relative w-24"></div>
                      <div className="grid items-end justify-center">
                        <div className="relative flex flex-col justify-end items-center w-64 h-[504px]">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/25a7cbb0066f516134cbed838dae9c33fc7224ce?width=668"
                            alt="Phone mockup 1"
                            className="overflow-hidden"
                            style={{ border: "4px none rgb(0, 0, 0)" }}
                          />
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/9a6fdc0a24d45f0be25d4882a43c7c88728a99cc?width=668"
                            alt="Phone mockup 2"
                            className="rounded-2xl absolute right-0 w-60"
                            style={{
                              left: "176px",
                              border: "4px none rgb(0, 0, 0)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-8 z-10 justify-center my-12 mr-6">
                        <div className="relative w-[250px]"></div>
                        <div className="flex flex-col justify-center items-start" style={{ width: "300px" }}>
                          <h3 className="text-4xl font-semibold mb-6">
                            {content.title}
                          </h3>
                          <p className="text-lg mb-8 text-gray-700">
                            {content.description}
                          </p>
                          <button className="bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
                            Learn more
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-2 justify-end items-center mt-6">
              <button
                onClick={prevLifestyleSlide}
                className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextLifestyleSlide}
                className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16">
            Our last articles
          </h2>

          {/* Sleep Articles */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold">Last articles on Sleep</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSleepArticlesPage(prev => Math.max(0, prev - 1))}
                  disabled={sleepArticlesPage === 0}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSleepArticlesPage(prev => Math.min(1, prev + 1))}
                  disabled={sleepArticlesPage === 1}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sleepArticles.map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    {article.category}
                  </div>
                  <h4 className="font-semibold text-lg">{article.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Mind Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold">Last articles on Mind</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setMindArticlesPage(prev => Math.max(0, prev - 1))}
                  disabled={mindArticlesPage === 0}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setMindArticlesPage(prev => Math.min(1, prev + 1))}
                  disabled={mindArticlesPage === 1}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mindArticles.map((article, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    {article.category}
                  </div>
                  <h4 className="font-semibold text-lg">{article.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold mb-6">
              Meet our top-level experts
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From doctors to psychologist, master or even teachers,you'll have
              the choice to get the next moves. Available in the complete plan.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {/* First set of experts */}
              {experts.map((expert, index) => (
                <div key={`first-${index}`} className="relative group flex-shrink-0" style={{ width: "280px", marginRight: "32px" }}>
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {expert.name}
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-center">
                        {expert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Second set of experts for seamless loop */}
              {experts.map((expert, index) => (
                <div key={`second-${index}`} className="relative group flex-shrink-0" style={{ width: "280px", marginRight: "32px" }}>
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {expert.name}
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-center">
                        {expert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Third set for extra smoothness */}
              {experts.map((expert, index) => (
                <div key={`third-${index}`} className="relative group flex-shrink-0" style={{ width: "280px", marginRight: "32px" }}>
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {expert.name}
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-center">
                        {expert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="bg-black text-white px-12 py-6 rounded-full text-xl font-medium hover:bg-gray-800 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16">
            Members are enjoying <br />
            happier and healthier lives
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-3xl p-8"
                style={{ height: "492px" }}
              >
                <div
                  style={{
                    display: "grid",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="text-lg font-semibold leading-relaxed"
                    style={{ marginBottom: "32px" }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      marginTop: "20px",
                      height: "200px",
                    }}
                  />
                  <p className="text-sm text-gray-600">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/0adc245cd947d6d9433bd09299fd12b548a7a398?width=2624')`,
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          {/* Sparkle decoration */}
          <div className="absolute top-8 left-8">
            <svg width="80" height="80" viewBox="0 0 124 136" fill="none">
              <path
                d="M58.192 28.8948C58.9954 28.8948 59.3974 28.4785 59.5983 27.8246C61.674 17.8957 61.5403 17.658 73.192 15.6959C73.9954 15.5772 74.4643 15.1609 74.4643 14.4473C74.4643 13.734 73.9954 13.3177 73.192 13.1988C61.6071 11.1182 61.942 10.8802 59.5983 1.07035C59.3974 0.416393 58.9954 0.00012207 58.192 0.00012207C57.3883 0.00012207 56.9866 0.416393 56.7857 1.07035C54.442 10.8802 54.8437 11.1182 43.192 13.1988C42.4554 13.3177 41.9197 13.734 41.9197 14.4473C41.9197 15.1609 42.4554 15.5772 43.192 15.6959C54.8437 17.777 54.7097 17.8957 56.7857 27.8246C56.9866 28.4785 57.3883 28.8948 58.192 28.8948ZM25.7814 69.7989C27.0537 69.7989 27.9243 69.0853 28.058 68.0154C30.4689 52.141 31.0714 52.141 49.5537 48.9902C50.7591 48.8116 51.6294 48.0983 51.6294 46.9687C51.6294 45.8985 50.7591 45.1255 49.5537 44.9472C31.0714 42.688 30.4017 42.1528 28.058 25.9814C27.9243 24.9114 27.0537 24.1385 25.7814 24.1385C24.576 24.1385 23.7054 24.9114 23.5714 26.041C21.3617 41.9745 20.424 41.9151 2.076 44.9472C0.870571 45.1852 0 45.8985 0 46.9687C0 48.1577 0.870572 48.8116 2.34371 48.9902C20.558 51.606 21.3617 52.0223 23.5714 67.8964C23.7054 69.0853 24.576 69.7989 25.7814 69.7989ZM71.1832 135.614C72.9243 135.614 74.1966 134.485 74.5312 132.879C79.2857 100.299 84.442 95.3639 120.737 91.7966C122.612 91.6183 123.884 90.3697 123.884 88.8241C123.884 87.2782 122.612 86.089 120.737 85.8513C84.442 82.284 79.2857 77.3494 74.5312 44.7689C74.1966 43.1637 72.9243 42.0934 71.1832 42.0934C69.442 42.0934 68.1697 43.1637 67.902 44.7689C63.1474 77.3494 57.9243 82.284 21.6963 85.8513C19.7546 86.089 18.4823 87.2782 18.4823 88.8241C18.4823 90.3697 19.7546 91.6183 21.6963 91.7966C57.8571 96.0179 62.8794 100.358 67.902 132.879C68.1697 134.485 69.442 135.614 71.1832 135.614Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="mb-12">
            <div className="border-4 border-white rounded-full px-8 py-4 inline-flex items-center gap-4 mb-8">
              <div className="flex">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/35c51fc4e53b41e88b1513ed3f583c91dc267389?width=184"
                  alt="Users"
                  className="w-20 h-8"
                />
              </div>
              <span className="text-xl">
                <strong>611.8k</strong> lifestyling
              </span>
            </div>
          </div>

          <h2
            className="text-5xl md:text-6xl font-semibold mb-12"
            style={{ lineHeight: "70px" }}
          >
            Join the millions <br />
            who use Lifestyle <br />
            every day
          </h2>

          <button className="bg-black text-white px-12 py-6 rounded-3xl text-2xl font-semibold mb-16">
            Try for free
          </button>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-lg font-semibold">App Store rating</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">100M+</div>
              <p className="text-lg font-semibold">Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">465M+</div>
              <p className="text-lg font-semibold">Minutes meditated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-5xl md:text-6xl font-semibold text-center mb-16"
            style={{ lineHeight: "70px" }}
          >
            Our plans, <br />
            made with love
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-3xl"
                style={{
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  border: "1px none rgb(0, 0, 0)",
                  padding: "32px 32px 20px",
                }}
              >
                <div className="border-b border-black pb-4 mb-8">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                </div>

                <div style={{ display: "grid", flexDirection: "column" }}>
                  <div className="mb-8">
                    <div
                      className="flex items-end mb-6"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span className="text-lg">$</span>
                        <span className="text-4xl font-normal">
                          {plan.price}
                        </span>
                      </div>
                      <span
                        className="text-xs text-gray-500"
                        style={{ margin: "0 0 4px 4px" }}
                      >
                        USD/month
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.name === "Pro Plan" && (
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>All included in Plus Plan</span>
                        </div>
                      )}
                      {plan.name === "Max Plan" && (
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>All included in Pro Plan</span>
                        </div>
                      )}
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                          style={{
                            marginTop:
                              (plan.name === "Pro Plan" ||
                                plan.name === "Max Plan") &&
                              featureIndex === 0
                                ? undefined
                                : "12px",
                          }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-medium mb-4">
                      Guaranteed in this plan
                    </h4>
                    <div className="space-y-3">
                      {plan.guarantees.map((guarantee, guaranteeIndex) => (
                        <div
                          key={guaranteeIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span>{guarantee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      height: "0px",
                      margin: "16px 0",
                    }}
                  />
                </div>

                <button
                  className={`w-full py-4 rounded-full font-medium`}
                  style={{
                    backgroundColor:
                      plan.name === "Plus Plan"
                        ? "rgb(255, 255, 255)"
                        : plan.buttonStyle.includes("bg-black")
                          ? "rgb(0, 0, 0)"
                          : "rgb(255, 255, 255)",
                    color: plan.buttonStyle.includes("text-white")
                      ? "rgb(255, 255, 255)"
                      : "rgb(0, 0, 0)",
                    border: "1px none rgb(0, 0, 0)",
                  }}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-cover bg-center relative py-20"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/6b51dae713ae449e455c96ca2bde037b456c8c18?width=2880')`,
        }}
      >
        <div className="absolute inset-0 bg-purple-900/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="font-roboto text-6xl font-medium mb-2">
                  Website of
                </h3>
                <h3 className="font-shrikhand text-6xl text-center">
                  energies
                </h3>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 mb-8">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/433b3c2c2fdc1651876d6448e272cb9e4fc02393?width=158"
                  alt="Instagram"
                  style={{ width: "42px", height: "42px" }}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d199181698e43581e3becaef5ee0b3c2618a81ec?width=138"
                  alt="Facebook"
                  style={{ width: "42px", height: "42px" }}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/c7eeb7031c9b7fd8d3c39ab9b1b99e935f5e6c2c?width=138"
                  alt="Twitter"
                  style={{ width: "42px", height: "42px" }}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/ce2b5166f8fab3c7a38bd92d7a0bc86e11a47ea6?width=138"
                  alt="YouTube"
                  style={{ width: "42px", height: "42px" }}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15660308f942849ee97bb806ae67d4f2b9bfd449?width=138"
                  alt="TikTok"
                  style={{ width: "42px", height: "42px" }}
                />
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Our content</h4>
              <ul className="space-y-3 text-lg">
                <li>Meditation app</li>
                <li>Sleep music</li>
                <li>Mindfulness parenting</li>
                <li>Mental health support</li>
                <li>Our experts</li>
                <li>Focus music</li>
                <li>White noise</li>
                <li>Mental health resources</li>
                <li>Browse all articles</li>
                <li>Browse our content library</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-lg">
                <li>Help</li>
                <li>Contact us</li>
                <li>Mental health resources</li>
                <li>Accessibility Statement</li>
                <li>Security</li>
                <li>Cookie policy</li>
              </ul>

              <h4 className="text-xl font-semibold mb-6 mt-12">About us</h4>
              <ul className="space-y-3 text-lg">
                <li>About Headspace</li>
                <li>About the Headspace app</li>
                <li>Leadership</li>
                <li>Press</li>
                <li>Careers</li>
                <li>Sitemap</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom footer section */}
      <div
        className="bg-black text-white flex items-center h-24 px-10"
        style={{ height: "100px", padding: "0 20px 0 40px" }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-8 text-sm">
            <span>© 2025 Scientologic Inc.</span>
            <span className="underline">Terms & conditions</span>
            <span className="underline">Privacy policy</span>
            <span className="underline">Consumer Health Data</span>
            <span className="underline">CA Privacy Notice</span>
          </div>
          <div className="flex items-center gap-3 border-4 border-white rounded-full px-6 py-3">
            <Globe className="w-6 h-6" />
            <span className="text-lg">English</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
