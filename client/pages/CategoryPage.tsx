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
      background: "linear-gradient(99deg, rgba(39, 165, 255, 0.85) 3.67%, rgba(67, 39, 255, 0.85) 91.7%)",
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
      background: "linear-gradient(99deg, rgba(139, 92, 246, 0.85) 3.67%, rgba(99, 102, 241, 0.85) 91.7%)",
      hero: {
        title: "Cultivate your mind",
        subtitle: "Mindfulness practices for daily clarity",
        description: "Mind by Lifestyle is designed to help you develop mindfulness and mental clarity. Explore meditation techniques, visualization exercises, and cognitive training to enhance your mental well-being."
      },
      subCategories: [
        { name: "Mindfulness", isActive: true },
        { name: "Visualization", isActive: false },
        { name: "Inner Peace", isActive: false },
        { name: "Focused Mind", isActive: false },
        { name: "Guided Meditation", isActive: false }
      ]
    },
    MENTAL: {
      title: "MENTAL",
      gradient: "from-pink-400 to-pink-800",
      background: "linear-gradient(99deg, rgba(236, 72, 153, 0.85) 3.67%, rgba(190, 24, 93, 0.85) 91.7%)",
      hero: {
        title: "Strengthen your mental health",
        subtitle: "Tools for emotional balance and resilience",
        description: "Mental wellness resources to help you manage stress, anxiety, and emotional challenges. Build resilience and develop healthy coping strategies for better mental health."
      },
      subCategories: [
        { name: "Emotional Balance", isActive: true },
        { name: "Anxiety Relief", isActive: false },
        { name: "Positive Thinking", isActive: false },
        { name: "Cognitive Reset", isActive: false },
        { name: "Inner Strength", isActive: false }
      ]
    },
    SOUL: {
      title: "SOUL",
      gradient: "from-red-400 to-red-800",
      background: "linear-gradient(99deg, rgba(248, 113, 113, 0.85) 3.67%, rgba(220, 38, 38, 0.85) 91.7%)",
      hero: {
        title: "Nourish your soul",
        subtitle: "Spiritual practices for inner peace",
        description: "Connect with your inner self through spiritual practices, personal growth exercises, and soul-nourishing activities designed to bring meaning and purpose to your life."
      },
      subCategories: [
        { name: "Social Dynamics", isActive: true },
        { name: "Soulmate", isActive: false },
        { name: "Sexuality", isActive: false },
        { name: "Friendship", isActive: false },
        { name: "Family", isActive: false }
      ]
    },
    BODY: {
      title: "BODY",
      gradient: "from-orange-400 to-orange-800",
      background: "linear-gradient(99deg, rgba(251, 146, 60, 0.85) 3.67%, rgba(234, 88, 12, 0.85) 91.7%)",
      hero: {
        title: "Strengthen your body",
        subtitle: "Physical wellness and fitness guidance",
        description: "Take care of your physical health with workout routines, nutrition guidance, and wellness practices designed to keep your body strong and healthy."
      },
      subCategories: [
        { name: "Strength", isActive: true },
        { name: "Flexibility", isActive: false },
        { name: "Cardio", isActive: false },
        { name: "Recovery", isActive: false },
        { name: "Sports", isActive: false }
      ]
    },
    BRAIN: {
      title: "BRAIN",
      gradient: "from-yellow-400 to-yellow-800",
      background: "linear-gradient(99deg, rgba(251, 191, 36, 0.85) 3.67%, rgba(217, 119, 6, 0.85) 91.7%)",
      hero: {
        title: "Train your brain",
        subtitle: "Cognitive enhancement and brain training",
        description: "Enhance your cognitive abilities with brain training exercises, memory improvement techniques, and mental agility practices designed to optimize your brain function."
      },
      subCategories: [
        { name: "Mnemonics", isActive: true },
        { name: "MindMap", isActive: false },
        { name: "Speed Reading", isActive: false },
        { name: "GPTpedia", isActive: false },
        { name: "Tools", isActive: false }
      ]
    },
    FOOD: {
      title: "FOOD",
      gradient: "from-green-400 to-green-800",
      background: "linear-gradient(99deg, rgba(74, 222, 128, 0.85) 3.67%, rgba(22, 101, 52, 0.85) 91.7%)",
      hero: {
        title: "Nourish with food",
        subtitle: "Nutrition and mindful eating practices",
        description: "Discover the power of nutrition and mindful eating. Learn about healthy recipes, nutritional science, and eating practices that support your overall wellness."
      },
      subCategories: [
        { name: "Nutrition", isActive: true },
        { name: "World Cuisine", isActive: false },
        { name: "Special Diets", isActive: false },
        { name: "Snacks", isActive: false },
        { name: "Creative", isActive: false }
      ]
    },
    HEALTH: {
      title: "HEALTH",
      gradient: "from-cyan-400 to-cyan-800",
      background: "linear-gradient(99deg, rgba(34, 211, 238, 0.85) 3.67%, rgba(14, 116, 144, 0.85) 91.7%)",
      hero: {
        title: "Optimize your health",
        subtitle: "Holistic health and wellness practices",
        description: "Take a comprehensive approach to your health with evidence-based practices, preventive care insights, and holistic wellness strategies for optimal living."
      },
      subCategories: [
        { name: "Wellness", isActive: true },
        { name: "Prevention", isActive: false },
        { name: "Recovery", isActive: false },
        { name: "Balance", isActive: false },
        { name: "Vitality", isActive: false }
      ]
    }
  };

  const currentCategory = category?.toUpperCase() as keyof typeof categoryConfig;
  const config = categoryConfig[currentCategory] || categoryConfig.SLEEP;

  // Dynamic content based on category
  const getCategoryContent = () => {
    const contentMap = {
      SLEEP: {
        articles: [
          { title: "How to make the dreams last", category: "Lucid Dreams", image: "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640" },
          { title: "What is your sleep type?", category: "Sleep Types", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "How to have a clean sleep at night", category: "Sleep Quality", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Have your own daily routine!", category: "Daily Routines", image: "https://api.builder.io/api/v1/image/assets/TEMP/e522cc4ae8fe3db303abab4412d69b57558f552a?width=640" }
        ],
        popular: [
          { title: "The Science of Sleep Cycles", category: "Sleep Science", image: "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640" },
          { title: "REM Sleep and Dreaming", category: "Sleep Types", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Creating the Perfect Sleep Environment", category: "Sleep Quality", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Sleep Meditation Techniques", category: "Technology", image: "https://api.builder.io/api/v1/image/assets/TEMP/e522cc4ae8fe3db303abab4412d69b57558f552a?width=640" }
        ]
      },
      MIND: {
        articles: [
          { title: "How to become mindful in a month", category: "Mindfulness", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Visualize the entire universe with the power of meditation", category: "Visualization", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Develop your self love", category: "Meditation", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "How to leverage the true power of your mind", category: "Focus", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ],
        popular: [
          { title: "Daily Meditation Practice", category: "Mindfulness", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Advanced Visualization Techniques", category: "Visualization", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Mindful Breathing Exercises", category: "Meditation", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "Concentration Training Methods", category: "Focus", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ]
      },
      MENTAL: {
        articles: [
          { title: "Building Emotional Resilience", category: "Emotional Balance", image: "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484" },
          { title: "Managing Daily Stress", category: "Anxiety Relief", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Cognitive Behavioral Techniques", category: "Stress Management", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Building Mental Strength", category: "Resilience", image: "https://api.builder.io/api/v1/image/assets/TEMP/e522cc4ae8fe3db303abab4412d69b57558f552a?width=640" }
        ],
        popular: [
          { title: "Understanding Anxiety Triggers", category: "Anxiety Relief", image: "https://api.builder.io/api/v1/image/assets/TEMP/3516e1b0a2fc421f2e50fc235044d64f99114005?width=484" },
          { title: "Emotional Regulation Strategies", category: "Emotional Balance", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Mindful Stress Relief", category: "Stress Management", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Therapeutic Approaches", category: "Therapy", image: "https://api.builder.io/api/v1/image/assets/TEMP/e522cc4ae8fe3db303abab4412d69b57558f552a?width=640" }
        ]
      },
      SOUL: {
        articles: [
          { title: "Connecting with Your Inner Self", category: "Spirituality", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "Finding Peace Within", category: "Inner Peace", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Self-Love Journey", category: "Self Love", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Discovering Your Life Purpose", category: "Purpose", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ],
        popular: [
          { title: "Spiritual Awakening Guide", category: "Spirituality", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "Meditation for Inner Peace", category: "Inner Peace", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Gratitude Practice", category: "Gratitude", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Purpose-Driven Living", category: "Purpose", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ]
      },
      BODY: {
        articles: [
          { title: "Full Body Workout Routine", category: "Fitness", image: "https://api.builder.io/api/v1/image/assets/TEMP/fd74e58271b720eeaf18a0bb7349b3c3c9ec26bf?width=640" },
          { title: "Nutrition for Optimal Health", category: "Nutrition", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Movement and Mobility", category: "Movement", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Recovery and Rest", category: "Recovery", image: "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640" }
        ],
        popular: [
          { title: "Strength Training Basics", category: "Strength", image: "https://api.builder.io/api/v1/image/assets/TEMP/fd74e58271b720eeaf18a0bb7349b3c3c9ec26bf?width=640" },
          { title: "Cardio for Heart Health", category: "Fitness", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Flexibility and Yoga", category: "Movement", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Sleep and Recovery", category: "Recovery", image: "https://api.builder.io/api/v1/image/assets/TEMP/ea99e73276d1abd9cd94db39da6a337169268ceb?width=640" }
        ]
      },
      BRAIN: {
        articles: [
          { title: "Memory Enhancement Techniques", category: "Memory", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" },
          { title: "Concentration Training", category: "Focus", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Learning Optimization", category: "Learning", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Creative Thinking Methods", category: "Creativity", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" }
        ],
        popular: [
          { title: "Brain Training Exercises", category: "Memory", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" },
          { title: "Problem Solving Skills", category: "Logic", image: "https://api.builder.io/api/v1/image/assets/TEMP/6fd9dffe05b2445c6c01f9b87871de85a43a3c1c?width=640" },
          { title: "Effective Study Methods", category: "Learning", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Innovation and Creativity", category: "Creativity", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" }
        ]
      },
      FOOD: {
        articles: [
          { title: "Understanding Macronutrients", category: "Nutrition", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Healthy Recipe Collections", category: "Recipes", image: "https://api.builder.io/api/v1/image/assets/TEMP/fd74e58271b720eeaf18a0bb7349b3c3c9ec26bf?width=640" },
          { title: "Mindful Eating Practices", category: "Mindful Eating", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Essential Supplements Guide", category: "Supplements", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ],
        popular: [
          { title: "Plant-Based Nutrition", category: "Nutrition", image: "https://api.builder.io/api/v1/image/assets/TEMP/20b1ef112a92489372731f3b69b7512545024925?width=640" },
          { title: "Quick Healthy Meals", category: "Recipes", image: "https://api.builder.io/api/v1/image/assets/TEMP/fd74e58271b720eeaf18a0bb7349b3c3c9ec26bf?width=640" },
          { title: "Natural Detox Methods", category: "Detox", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Intuitive Eating", category: "Mindful Eating", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ]
      },
      HEALTH: {
        articles: [
          { title: "Preventive Health Screening", category: "Preventive Care", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Holistic Wellness Approach", category: "Wellness", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "Building Healthy Habits", category: "Habits", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Evidence-Based Health", category: "Science", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ],
        popular: [
          { title: "Health Risk Assessment", category: "Preventive Care", image: "https://api.builder.io/api/v1/image/assets/TEMP/58d76ffbf8416d628119e44317b9a1b20e7cb54f?width=640" },
          { title: "Lifestyle Medicine", category: "Lifestyle", image: "https://api.builder.io/api/v1/image/assets/TEMP/4b3011cc2d2adcb9622b0569f304355c6f3c65e4?width=640" },
          { title: "Wellness Technology", category: "Science", image: "https://api.builder.io/api/v1/image/assets/TEMP/e24ace208c1b70cfb4056da83bec83a5bfd83980?width=640" },
          { title: "Healthy Aging", category: "Wellness", image: "https://api.builder.io/api/v1/image/assets/TEMP/a9ed354e828f49cccb22a67a888a73248e13aba0?width=640" }
        ]
      }
    };
    return contentMap[currentCategory] || contentMap.SLEEP;
  };

  const articles = getCategoryContent().articles;
  const popularArticles = getCategoryContent().popular;

  useEffect(() => {
    if (config.subCategories.length > 0) {
      setSelectedSubCategory(config.subCategories[0].name);
    }
  }, [category]);

  // Dynamic content for subcategories
  const getSubCategoryContent = () => {
    const allContent = {
      SLEEP: {
        'Lucid Dreams': {
          title: 'Unlock the World of Lucid Dreams',
          description: 'Embark on a journey into the fascinating realm of lucid dreaming with our dedicated app. Designed to guide you toward heightened awareness during sleep, it offers guided meditations, relaxation techniques, soothing soundscapes, and immersive sessions to help you take control of your dreams.',
          section2: { title: 'Master Your Dreams, Master Your Mind', description: 'Our innovative app accompanies you in learning lucid dreaming techniques. Through interactive tools, practical exercises, and personalized advice, you\'ll develop the ability to recognize and control your dreams.' },
          section3: { title: 'Consciously Journey Through Your Dreams', description: 'Gift yourself a unique dream experience with our app dedicated to lucid dreaming. It offers structured programs, reality check reminders, and sleep cycle analyses to promote the emergence of lucid dreams.' }
        },
        'Sleep Types': {
          title: 'Understand Your Sleep Patterns',
          description: 'Discover the different types of sleep and how they affect your daily life. Learn to identify your natural sleep chronotype, optimize your sleep schedule, and work with your body\'s natural rhythms for better rest and recovery.',
          section2: { title: 'Discover Your Chronotype', description: 'Learn about the science of circadian rhythms and how your genetic makeup influences your natural sleep-wake cycle. Understanding whether you\'re a morning lark or night owl can revolutionize your sleep quality.' },
          section3: { title: 'Optimize Your Sleep Schedule', description: 'Create a personalized sleep schedule that works with your natural tendencies. Learn strategies for adjusting your routine, managing shift work, and overcoming jet lag while honoring your unique sleep type.' }
        },
        'Sleep Quality': {
          title: 'Optimize Your Sleep Environment',
          description: 'Transform your bedroom into a sanctuary for restorative sleep. Explore evidence-based strategies for improving sleep quality, from temperature and lighting control to creating the perfect pre-sleep routine.',
          section2: { title: 'Create the Perfect Sleep Sanctuary', description: 'Design your ideal sleep environment with optimal temperature, lighting, and sound conditions. Learn about sleep-promoting materials and arrangements that support deep, restorative rest.' },
          section3: { title: 'Master Your Pre-Sleep Routine', description: 'Develop powerful evening rituals that prepare your mind and body for quality sleep. Discover relaxation techniques and mindfulness practices that help you transition into peaceful slumber.' }
        },
        'Daily Routines': {
          title: 'Build Healthy Sleep Habits',
          description: 'Establish powerful daily routines that support better sleep. Learn how your daytime activities, exercise timing, meal scheduling, and evening rituals all contribute to achieving deeper, more restorative sleep.',
          section2: { title: 'Design Your Daily Sleep Foundation', description: 'Create a comprehensive daily routine that sets you up for sleep success. From morning light exposure to afternoon exercise timing, learn how every part of your day influences rest quality.' },
          section3: { title: 'Evening Rituals for Better Sleep', description: 'Develop consistent evening practices that signal to your body it\'s time to wind down. Master the art of creating boundaries between day and night activities for natural sleepiness.' }
        },
        'Technology': {
          title: 'Leverage Sleep Technology',
          description: 'Discover how modern technology can enhance your sleep experience. From sleep tracking apps and smart devices to guided meditations and soundscapes, learn to use technology as a tool for better sleep.',
          section2: { title: 'Smart Sleep Tracking Solutions', description: 'Explore the latest sleep monitoring technology and learn how to interpret your sleep data meaningfully. Understand the benefits and limitations of wearables and smart mattresses.' },
          section3: { title: 'Digital Tools for Sleep Enhancement', description: 'Harness the power of sleep apps, white noise machines, and smart lighting systems. Learn to balance the benefits of sleep technology with healthy digital boundaries.' }
        }
      },
      MIND: {
        'Mindfulness': {
          title: 'Cultivate Present Moment Awareness',
          description: 'Develop the transformative practice of mindfulness to enhance your daily life. Learn meditation techniques, breathing exercises, and awareness practices that help you stay grounded in the present moment.',
          section2: { title: 'Master Mindful Living', description: 'Integrate mindfulness into every aspect of your daily routine. From mindful eating to walking meditation, discover how to bring conscious awareness to all your activities.' },
          section3: { title: 'Transform Through Mindfulness', description: 'Experience the profound benefits of regular mindfulness practice. Reduce stress, increase emotional regulation, and develop a deeper connection with yourself and others.' }
        },
        'Visualization': {
          title: 'Harness the Power of Mental Imagery',
          description: 'Unlock your mind\'s creative potential through guided visualization techniques. Learn to use mental imagery for goal achievement, stress reduction, and personal transformation.',
          section2: { title: 'Creative Visualization Mastery', description: 'Master advanced visualization techniques that can transform your reality. Learn to create vivid mental images that inspire action and manifest positive changes in your life.' },
          section3: { title: 'Manifest Your Vision', description: 'Use the science of visualization to achieve your goals. Combine mental imagery with action planning to create powerful pathways to success and personal fulfillment.' }
        },
        'Inner Peace': {
          title: 'Find Your Inner Sanctuary',
          description: 'Discover the path to lasting inner peace through contemplative practices and spiritual wisdom. Learn to access the calm center within yourself, regardless of external circumstances.',
          section2: { title: 'Cultivate Emotional Serenity', description: 'Develop tools for maintaining emotional balance in challenging times. Learn ancient and modern techniques for finding peace amidst life\'s inevitable storms.' },
          section3: { title: 'Live from Your Center', description: 'Experience the freedom of living from a place of inner peace. Transform your relationships, work, and daily experiences through the cultivation of inner tranquility.' }
        },
        'Focused Mind': {
          title: 'Develop Laser-Sharp Focus',
          description: 'Train your mind to achieve unprecedented levels of concentration and mental clarity. Learn proven techniques for eliminating distractions and enhancing cognitive performance.',
          section2: { title: 'Master Mental Concentration', description: 'Build your capacity for sustained attention through progressive focus training. Develop the mental discipline that leads to peak performance in all areas of life.' },
          section3: { title: 'Achieve Flow States', description: 'Learn to access states of optimal focus where time disappears and performance soars. Master the conditions that create flow and integrate them into your daily practice.' }
        },
        'Guided Meditation': {
          title: 'Journey Through Guided Practice',
          description: 'Experience the transformative power of guided meditation with expert-led sessions designed to deepen your practice and explore different aspects of consciousness.',
          section2: { title: 'Explore Meditation Styles', description: 'Discover various meditation traditions and find the practices that resonate most deeply with you. From loving-kindness to body awareness, explore the rich landscape of meditative practices.' },
          section3: { title: 'Deepen Your Practice', description: 'Progress from beginner to advanced practitioner with structured guidance. Learn to navigate the challenges and celebrate the breakthroughs of deepening meditation practice.' }
        }
      },
      MENTAL: {
        'Emotional Balance': {
          title: 'Master Your Emotional Landscape',
          description: 'Develop the skills to navigate your emotions with wisdom and grace. Learn evidence-based techniques for emotional regulation, resilience building, and mental well-being.',
          section2: { title: 'Build Emotional Intelligence', description: 'Cultivate the ability to understand, manage, and use emotions effectively. Develop greater self-awareness and improve your relationships through emotional mastery.' },
          section3: { title: 'Create Lasting Stability', description: 'Establish a foundation of emotional stability that supports your overall mental health. Learn to bounce back from setbacks and maintain equilibrium in challenging times.' }
        },
        'Anxiety Relief': {
          title: 'Find Freedom from Anxiety',
          description: 'Discover effective strategies for managing and reducing anxiety in your daily life. Learn practical tools, breathing techniques, and cognitive approaches that provide real relief.',
          section2: { title: 'Understand Your Anxiety', description: 'Gain insight into the nature of anxiety and how it affects your mind and body. Learn to recognize triggers and develop personalized strategies for anxiety management.' },
          section3: { title: 'Build Confidence and Calm', description: 'Transform your relationship with anxiety and develop unshakeable inner confidence. Learn techniques that help you feel grounded, calm, and capable in any situation.' }
        },
        'Positive Thinking': {
          title: 'Rewire Your Mind for Positivity',
          description: 'Transform negative thought patterns and cultivate an optimistic mindset that enhances your life experience. Learn the science and practice of positive psychology.',
          section2: { title: 'Challenge Limiting Beliefs', description: 'Identify and transform the thoughts that hold you back. Learn cognitive restructuring techniques that help you see situations more clearly and respond more effectively.' },
          section3: { title: 'Create Positive Change', description: 'Use the power of positive thinking to create meaningful changes in your life. Learn to maintain optimism while staying grounded in reality and taking effective action.' }
        },
        'Cognitive Reset': {
          title: 'Refresh Your Mental Patterns',
          description: 'Learn powerful techniques to reset unproductive mental patterns and develop new ways of thinking that serve your highest potential and well-being.',
          section2: { title: 'Break Mental Loops', description: 'Recognize and interrupt destructive thought cycles that keep you stuck. Develop the awareness and tools needed to create new, more beneficial mental patterns.' },
          section3: { title: 'Install New Programs', description: 'Replace outdated mental programming with fresh perspectives and approaches. Learn to think more clearly, solve problems more effectively, and make better decisions.' }
        },
        'Inner Strength': {
          title: 'Cultivate Unshakeable Resilience',
          description: 'Develop the inner strength and resilience needed to thrive in any circumstance. Learn to tap into your core power and maintain your center through life\'s challenges.',
          section2: { title: 'Build Mental Fortitude', description: 'Strengthen your psychological resilience through proven practices and mindset training. Develop the mental toughness that helps you persevere and grow through difficulties.' },
          section3: { title: 'Embody Your Power', description: 'Learn to access and express your authentic power in healthy, constructive ways. Develop confidence that comes from deep inner knowing and unshakeable self-trust.' }
        }
      },
      SOUL: {
        'Social Dynamics': {
          title: 'Master the Art of Connection',
          description: 'Understand the subtle dynamics that govern human relationships and social interactions. Learn to navigate social situations with confidence, authenticity, and emotional intelligence.',
          section2: { title: 'Build Meaningful Relationships', description: 'Develop the skills to create deep, authentic connections with others. Learn the principles of effective communication, empathy, and mutual understanding.' },
          section3: { title: 'Navigate Social Complexity', description: 'Master the nuances of group dynamics, social hierarchies, and cultural differences. Develop the wisdom to handle complex social situations with grace and effectiveness.' }
        },
        'Soulmate': {
          title: 'Attract Your Soul Companion',
          description: 'Explore the journey of finding and nurturing a deep soul connection. Learn to prepare yourself for meaningful partnership and recognize authentic soul-level compatibility.',
          section2: { title: 'Prepare for Deep Love', description: 'Develop the self-awareness and emotional maturity needed for profound partnership. Learn to become the person who naturally attracts and maintains soul-level connections.' },
          section3: { title: 'Nurture Sacred Union', description: 'Discover how to maintain and deepen soul connections over time. Learn the practices that keep love alive and help relationships evolve to their highest potential.' }
        },
        'Sexuality': {
          title: 'Embrace Sacred Sexuality',
          description: 'Explore sexuality as a sacred expression of human connection and personal power. Learn to integrate physical intimacy with emotional and spiritual depth.',
          section2: { title: 'Heal and Integrate', description: 'Address past wounds and cultural conditioning around sexuality. Develop a healthy, integrated relationship with your sexual energy and expression.' },
          section3: { title: 'Express with Authenticity', description: 'Learn to express your sexuality in ways that honor both yourself and your partners. Develop communication skills and practices that enhance intimate connection.' }
        },
        'Friendship': {
          title: 'Cultivate Lasting Friendships',
          description: 'Learn the art of creating and maintaining meaningful friendships that enrich your life. Discover how to be a better friend and attract quality connections.',
          section2: { title: 'Deepen Friend Connections', description: 'Move beyond surface-level interactions to create friendships with depth and meaning. Learn to share authentically and create bonds that stand the test of time.' },
          section3: { title: 'Build Your Tribe', description: 'Create a supportive community of friends who inspire and challenge you to grow. Learn to be selective about relationships while remaining open and welcoming to new connections.' }
        },
        'Family': {
          title: 'Heal and Strengthen Family Bonds',
          description: 'Navigate family relationships with wisdom and compassion. Learn to heal old wounds, set healthy boundaries, and create more loving family dynamics.',
          section2: { title: 'Transform Family Patterns', description: 'Recognize and transform inherited family patterns that no longer serve. Learn to break cycles of dysfunction and create new traditions of love and support.' },
          section3: { title: 'Create Family Harmony', description: 'Develop skills for peaceful conflict resolution and effective family communication. Learn to honor family connections while maintaining your individual authenticity.' }
        }
      },
      BODY: {
        'Strength': {
          title: 'Build Functional Strength',
          description: 'Develop real-world strength that serves you in daily life. Learn progressive training methods that build muscle, power, and resilience while preventing injury.',
          section2: { title: 'Progressive Strength Development', description: 'Master the principles of progressive overload and strength adaptation. Create sustainable training programs that continually challenge and develop your physical capabilities.' },
          section3: { title: 'Integrate Strength into Life', description: 'Learn to apply your strength training to real-world activities. Develop functional movement patterns that enhance your daily performance and quality of life.' }
        },
        'Flexibility': {
          title: 'Unlock Your Body\'s Potential',
          description: 'Improve your flexibility and mobility to move with grace and freedom. Learn stretching techniques, yoga practices, and movement patterns that enhance your range of motion.',
          section2: { title: 'Dynamic Movement Practice', description: 'Develop dynamic flexibility that supports athletic performance and daily activities. Learn movement flows that combine strength, flexibility, and coordination.' },
          section3: { title: 'Maintain Lifelong Mobility', description: 'Create sustainable flexibility practices that keep you mobile and pain-free throughout your life. Learn to address restrictions and maintain optimal movement quality.' }
        },
        'Cardio': {
          title: 'Enhance Cardiovascular Health',
          description: 'Develop a strong, healthy heart through smart cardiovascular training. Learn various cardio methods that improve endurance while supporting overall health and longevity.',
          section2: { title: 'Optimize Heart Health', description: 'Understand the science of cardiovascular training and how to optimize your workouts for maximum benefit. Learn to train smart, not just hard.' },
          section3: { title: 'Build Lasting Endurance', description: 'Develop cardiovascular fitness that supports your lifestyle and goals. Learn to enjoy cardio training while building the endurance that enhances every aspect of your life.' }
        },
        'Recovery': {
          title: 'Master the Art of Recovery',
          description: 'Learn the critical importance of recovery in your fitness journey. Discover techniques for optimizing rest, sleep, and regeneration to maximize your training results.',
          section2: { title: 'Active Recovery Strategies', description: 'Implement active recovery techniques that enhance your adaptation to training. Learn the balance between rest and gentle movement that accelerates progress.' },
          section3: { title: 'Regeneration and Adaptation', description: 'Understand how your body adapts to training stress and how to optimize this process. Learn to listen to your body and provide what it needs for optimal recovery.' }
        },
        'Sports': {
          title: 'Excel in Athletic Performance',
          description: 'Whether you\'re a weekend warrior or competitive athlete, learn to enhance your sports performance through targeted training, mental preparation, and skill development.',
          section2: { title: 'Sport-Specific Training', description: 'Develop training programs tailored to your specific sport or activity. Learn to identify and address the unique demands of your chosen athletic pursuits.' },
          section3: { title: 'Mental Game Mastery', description: 'Develop the mental skills that separate good athletes from great ones. Learn visualization, focus techniques, and mental strategies that enhance performance under pressure.' }
        }
      },
      BRAIN: {
        'Mnemonics': {
          title: 'Master Memory Techniques',
          description: 'Learn powerful mnemonic techniques that dramatically improve your ability to remember information. Discover ancient and modern memory methods used by memory champions.',
          section2: { title: 'Advanced Memory Systems', description: 'Master complex memory systems like the Method of Loci and the Major System. Learn to memorize large amounts of information quickly and accurately.' },
          section3: { title: 'Apply Memory Skills', description: 'Integrate memory techniques into your daily life, work, and learning. Transform your ability to retain and recall information in practical, meaningful ways.' }
        },
        'MindMap': {
          title: 'Unlock Creative Thinking',
          description: 'Learn the art of mind mapping to enhance your creativity, problem-solving, and information organization. Discover how visual thinking can revolutionize your mental processes.',
          section2: { title: 'Advanced Mapping Techniques', description: 'Master sophisticated mind mapping approaches for complex projects and ideas. Learn to use color, symbols, and structure to enhance your thinking and planning.' },
          section3: { title: 'Transform Your Thinking', description: 'Use mind mapping to break through mental barriers and discover new possibilities. Learn to think more creatively and organize information more effectively.' }
        },
        'Speed Reading': {
          title: 'Read Faster, Comprehend Better',
          description: 'Double or triple your reading speed while maintaining or improving comprehension. Learn proven techniques for processing information more efficiently.',
          section2: { title: 'Advanced Reading Strategies', description: 'Master sophisticated reading techniques for different types of material. Learn to adapt your reading approach based on your purpose and the complexity of the text.' },
          section3: { title: 'Information Processing Mastery', description: 'Develop the ability to quickly extract key information from any text. Learn to read strategically and retain what matters most for your goals.' }
        },
        'GPTpedia': {
          title: 'Navigate the AI Revolution',
          description: 'Learn to effectively use AI tools like ChatGPT to enhance your learning, productivity, and problem-solving capabilities. Master the art of human-AI collaboration.',
          section2: { title: 'AI-Enhanced Learning', description: 'Discover how AI can accelerate your learning and skill development. Learn prompt engineering and AI interaction techniques that maximize your results.' },
          section3: { title: 'Future-Proof Your Skills', description: 'Develop the skills needed to thrive in an AI-enhanced world. Learn to leverage AI tools while maintaining and developing your uniquely human capabilities.' }
        },
        'Tools': {
          title: 'Optimize Your Thinking Tools',
          description: 'Discover and master the tools and techniques that enhance cognitive performance. From apps to techniques, learn to build a toolkit for optimal mental functioning.',
          section2: { title: 'Digital Cognitive Enhancement', description: 'Learn to use technology effectively to enhance your cognitive abilities. Discover apps, software, and digital tools that support better thinking and learning.' },
          section3: { title: 'Integrated Tool Mastery', description: 'Create a personalized toolkit of cognitive enhancement methods. Learn to combine traditional techniques with modern tools for maximum mental performance.' }
        }
      },
      FOOD: {
        'Nutrition': {
          title: 'Master the Science of Nutrition',
          description: 'Understand the fundamental principles of nutrition and how food affects your body, mind, and performance. Learn to make informed choices that support optimal health.',
          section2: { title: 'Personalized Nutrition', description: 'Discover how to tailor your nutrition approach to your unique needs, goals, and lifestyle. Learn to read your body\'s signals and adjust your diet accordingly.' },
          section3: { title: 'Nutrition for Life', description: 'Create sustainable nutrition habits that support your health throughout your lifetime. Learn to navigate changing nutritional needs as you age and evolve.' }
        },
        'World Cuisine': {
          title: 'Explore Global Flavors',
          description: 'Embark on a culinary journey around the world. Discover traditional cooking methods, authentic flavors, and the cultural significance of cuisines from different regions.',
          section2: { title: 'Cultural Food Wisdom', description: 'Learn from traditional food cultures and their time-tested approaches to nutrition and cooking. Discover how different cultures have optimized their diets for health and longevity.' },
          section3: { title: 'Fusion and Innovation', description: 'Learn to creatively combine elements from different cuisines while respecting their origins. Develop your own unique cooking style inspired by global traditions.' }
        },
        'Special Diets': {
          title: 'Navigate Dietary Approaches',
          description: 'Explore various dietary approaches and learn to determine what works best for your body and lifestyle. From plant-based to ketogenic, understand the science behind different diets.',
          section2: { title: 'Find Your Optimal Diet', description: 'Learn to experiment safely with different dietary approaches to find what makes you feel your best. Understand how to transition between diets and monitor your response.' },
          section3: { title: 'Sustainable Dietary Choices', description: 'Create a long-term dietary approach that balances health, environmental impact, and personal preferences. Learn to make choices that serve both you and the planet.' }
        },
        'Snacks': {
          title: 'Smart Snacking Strategies',
          description: 'Transform your snacking habits with healthy, satisfying options that support your energy and health goals. Learn to prepare and choose snacks that nourish rather than deplete.',
          section2: { title: 'Energy-Boosting Snacks', description: 'Discover snacks that provide sustained energy without the crash. Learn to balance macronutrients in your snacks for optimal blood sugar stability.' },
          section3: { title: 'Convenient Healthy Options', description: 'Learn to prepare healthy snacks that fit your busy lifestyle. Discover portable, nutritious options that support your health goals even when you\'re on the go.' }
        },
        'Creative': {
          title: 'Unleash Culinary Creativity',
          description: 'Develop your creativity in the kitchen and learn to cook intuitively. Discover how to experiment with flavors, techniques, and ingredients to create unique, delicious meals.',
          section2: { title: 'Flavor Development', description: 'Master the art of combining flavors to create memorable dishes. Learn about flavor pairing, seasoning techniques, and how to develop your palate.' },
          section3: { title: 'Cooking as Art', description: 'Approach cooking as a creative expression and form of self-care. Learn to enjoy the process of cooking and use it as a way to nurture yourself and others.' }
        }
      },
      HEALTH: {
        'Wellness': {
          title: 'Embrace Holistic Wellness',
          description: 'Adopt a comprehensive approach to wellness that addresses your physical, mental, emotional, and spiritual health. Learn to create balance across all dimensions of well-being.',
          section2: { title: 'Integrated Health Practices', description: 'Discover how different aspects of health interconnect and influence each other. Learn to create wellness practices that address your whole person, not just symptoms.' },
          section3: { title: 'Sustainable Wellness', description: 'Create wellness practices that you can maintain throughout your life. Learn to adapt your approach as your needs change and life circumstances evolve.' }
        },
        'Prevention': {
          title: 'Proactive Health Management',
          description: 'Learn the principles of preventive health care and how to reduce your risk of chronic diseases. Discover screening recommendations, lifestyle factors, and early intervention strategies.',
          section2: { title: 'Risk Assessment and Reduction', description: 'Understand your personal health risks and learn evidence-based strategies for reducing them. Take control of factors within your influence to optimize your health outcomes.' },
          section3: { title: 'Health Optimization', description: 'Go beyond disease prevention to actively optimize your health and vitality. Learn advanced strategies for enhancing your physical and mental performance.' }
        },
        'Recovery': {
          title: 'Master Health Recovery',
          description: 'Learn effective strategies for recovering from illness, injury, or health challenges. Discover how to support your body\'s natural healing processes and bounce back stronger.',
          section2: { title: 'Healing Acceleration', description: 'Understand the factors that speed healing and learn to optimize your recovery environment. Discover nutrition, sleep, and lifestyle factors that enhance your body\'s repair processes.' },
          section3: { title: 'Resilience Building', description: 'Develop the resilience to handle future health challenges more effectively. Learn to build physical and mental reserves that support your long-term well-being.' }
        },
        'Balance': {
          title: 'Achieve Life Balance',
          description: 'Learn to create and maintain balance across all areas of your life. Discover how to manage competing priorities while maintaining your health and well-being.',
          section2: { title: 'Work-Life Integration', description: 'Move beyond work-life balance to work-life integration. Learn to create synergy between different life domains rather than seeing them as competing forces.' },
          section3: { title: 'Dynamic Balance', description: 'Understand that balance is dynamic and learn to adjust as your life circumstances change. Develop the flexibility to maintain wellness through different life phases.' }
        },
        'Vitality': {
          title: 'Cultivate Lasting Vitality',
          description: 'Learn to maintain high energy, enthusiasm, and zest for life regardless of your age. Discover the practices and mindsets that keep you feeling vibrant and alive.',
          section2: { title: 'Energy Optimization', description: 'Master the art of energy management through nutrition, exercise, sleep, and stress management. Learn to maintain consistent energy levels throughout your day.' },
          section3: { title: 'Longevity Practices', description: 'Adopt practices that support healthy aging and longevity. Learn from the world\'s longest-lived populations and integrate their wisdom into your lifestyle.' }
        }
      }
    };

    const categoryContent = allContent[currentCategory];
    if (categoryContent && categoryContent[selectedSubCategory]) {
      return categoryContent[selectedSubCategory];
    }

    // Default fallback
    return {
      title: 'Explore ' + currentCategory,
      description: 'Discover comprehensive resources and guidance for your wellness journey.',
      section2: { title: 'Deepen Your Practice', description: 'Take your understanding to the next level with advanced techniques and insights.' },
      section3: { title: 'Transform Your Life', description: 'Apply what you learn to create lasting positive changes in your daily life.' }
    };
  };

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
        className="relative max-h-[1000px] flex flex-col overflow-hidden"
        style={{ background: config.background }}
      >
        {/* Navigation Pills */}
        <div className="flex gap-2 px-6 py-3 flex-shrink-0">
          {categoryPills.map((pill) => (
            <button
              key={pill.name}
              onClick={() => navigate(`/category/${pill.name.toLowerCase()}`)}
              className={`bg-gradient-to-r ${pill.colors} rounded-xl flex-1 text-center cursor-pointer transition-transform duration-200 hover:scale-105 font-semibold text-lg text-white drop-shadow-lg ${
                pill.name === currentCategory
                  ? "ring-4 ring-white ring-offset-2"
                  : ""
              }`}
              style={{ height: "46px", padding: "9px 0" }}
            >
              {pill.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-8 gap-8 min-h-0 overflow-y-auto">
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

              <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors mr-auto">
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
          <div className="px-6 lg:px-24 flex-shrink-0">
            <div className="flex flex-wrap gap-3 pb-4">
              {config.subCategories.map((subCat) => (
                <button
                  key={subCat.name}
                  onClick={() => setSelectedSubCategory(subCat.name)}
                  className={`px-4 py-2 rounded-full font-semibold text-base transition-colors hover:scale-105 transform duration-200 ${
                    selectedSubCategory === subCat.name
                      ? "bg-white text-black border-2 border-black"
                      : "bg-black text-white hover:bg-gray-800"
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
          className="space-y-20 mb-20 px-6 lg:px-24 py-20 -mx-6 lg:-mx-24"
          style={{
            background: currentCategory === 'SLEEP'
              ? 'linear-gradient(99deg, rgba(39, 165, 255, 0.7) 3.67%, rgba(67, 39, 255, 0.7) 91.7%)'
              : config.background
          }}
        >
          {/* Section 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
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
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
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
          <div className="flex flex-col lg:flex-row items-center gap-12">
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
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Last Articles on {config.title}</h2>
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
              <h2 className="text-3xl font-bold text-black">Most Popular Articles on {config.title}</h2>
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
