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
        { name: "Meditation", isActive: false },
        { name: "Focus", isActive: false },
        { name: "Awareness", isActive: false }
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
        { name: "Stress Management", isActive: false },
        { name: "Resilience", isActive: false },
        { name: "Therapy", isActive: false }
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
      background: "linear-gradient(99deg, rgba(251, 146, 60, 0.85) 3.67%, rgba(234, 88, 12, 0.85) 91.7%)",
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
      background: "linear-gradient(99deg, rgba(251, 191, 36, 0.85) 3.67%, rgba(217, 119, 6, 0.85) 91.7%)",
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
      background: "linear-gradient(99deg, rgba(74, 222, 128, 0.85) 3.67%, rgba(22, 101, 52, 0.85) 91.7%)",
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
      background: "linear-gradient(99deg, rgba(34, 211, 238, 0.85) 3.67%, rgba(14, 116, 144, 0.85) 91.7%)",
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
    if (currentCategory === 'SLEEP') {
      const sleepContent = {
        'Lucid Dreams': {
          title: 'Unlock the World of Lucid Dreams',
          description: 'Embark on a journey into the fascinating realm of lucid dreaming with our dedicated app. Designed to guide you toward heightened awareness during sleep, it offers guided meditations, relaxation techniques, soothing soundscapes, and immersive sessions to help you take control of your dreams.',
          section2: {
            title: 'Master Your Dreams, Master Your Mind',
            description: 'Our innovative app accompanies you in learning lucid dreaming techniques. Through interactive tools, practical exercises, and personalized advice, you\'ll develop the ability to recognize and control your dreams. Elevate your nocturnal consciousness and explore the depths of your imagination.'
          },
          section3: {
            title: 'Consciously Journey Through Your Dreams',
            description: 'Gift yourself a unique dream experience with our app dedicated to lucid dreaming. It offers structured programs, reality check reminders, and sleep cycle analyses to promote the emergence of lucid dreams. Awaken your mind during the night and discover a world where your dreams become reality.'
          }
        },
        'Sleep Types': {
          title: 'Understand Your Sleep Patterns',
          description: 'Discover the different types of sleep and how they affect your daily life. Learn to identify your natural sleep chronotype, optimize your sleep schedule, and work with your body\'s natural rhythms for better rest and recovery.',
          section2: {
            title: 'Discover Your Chronotype',
            description: 'Learn about the science of circadian rhythms and how your genetic makeup influences your natural sleep-wake cycle. Understanding whether you\'re a morning lark, night owl, or somewhere in between can revolutionize your sleep quality and daily energy levels.'
          },
          section3: {
            title: 'Optimize Your Sleep Schedule',
            description: 'Create a personalized sleep schedule that works with your natural tendencies rather than against them. Learn practical strategies for adjusting your routine, managing shift work, and overcoming jet lag while honoring your unique sleep type.'
          }
        },
        'Sleep Quality': {
          title: 'Optimize Your Sleep Environment',
          description: 'Transform your bedroom into a sanctuary for restorative sleep. Explore evidence-based strategies for improving sleep quality, from temperature and lighting control to creating the perfect pre-sleep routine that signals your body it\'s time to rest.',
          section2: {
            title: 'Create the Perfect Sleep Sanctuary',
            description: 'Design your ideal sleep environment with optimal temperature, lighting, and sound conditions. Learn about sleep-promoting materials, colors, and arrangements that support deep, restorative rest and help you wake up refreshed.'
          },
          section3: {
            title: 'Master Your Pre-Sleep Routine',
            description: 'Develop powerful evening rituals that prepare your mind and body for quality sleep. Discover relaxation techniques, breathing exercises, and mindfulness practices that help you transition from the day\'s stress into peaceful slumber.'
          }
        },
        'Daily Routines': {
          title: 'Build Healthy Sleep Habits',
          description: 'Establish powerful daily routines that support better sleep. Learn how your daytime activities, exercise timing, meal scheduling, and evening rituals all contribute to achieving deeper, more restorative sleep every night.',
          section2: {
            title: 'Design Your Daily Sleep Foundation',
            description: 'Create a comprehensive daily routine that sets you up for sleep success. From morning light exposure to afternoon exercise timing, learn how every part of your day influences your nighttime rest quality.'
          },
          section3: {
            title: 'Evening Rituals for Better Sleep',
            description: 'Develop consistent evening practices that signal to your body it\'s time to wind down. Master the art of creating boundaries between day and night activities, and establish calming rituals that promote natural sleepiness.'
          }
        },
        'Technology': {
          title: 'Leverage Sleep Technology',
          description: 'Discover how modern technology can enhance your sleep experience. From sleep tracking apps and smart devices to guided meditations and soundscapes, learn to use technology as a tool for better sleep rather than a distraction.',
          section2: {
            title: 'Smart Sleep Tracking Solutions',
            description: 'Explore the latest sleep monitoring technology and learn how to interpret your sleep data meaningfully. Understand the benefits and limitations of wearables, smartphone apps, and smart mattresses in optimizing your rest.'
          },
          section3: {
            title: 'Digital Tools for Sleep Enhancement',
            description: 'Harness the power of sleep apps, white noise machines, and smart lighting systems to create your perfect sleep environment. Learn to balance the benefits of sleep technology with healthy digital boundaries for optimal rest.'
          }
        }
      };
      return sleepContent[selectedSubCategory] || sleepContent['Lucid Dreams'];
    }
    // Default content for other categories
    return {
      title: currentCategory === 'MIND' ? 'Discover Your Inner Potential' :
             currentCategory === 'MENTAL' ? 'Build Mental Resilience' :
             currentCategory === 'SOUL' ? 'Connect with Your Soul' :
             currentCategory === 'BODY' ? 'Transform Your Physical Health' :
             currentCategory === 'BRAIN' ? 'Enhance Cognitive Function' :
             currentCategory === 'FOOD' ? 'Nourish Your Body Mindfully' :
             currentCategory === 'HEALTH' ? 'Optimize Your Well-being' : 'Unlock the World of Lucid Dreams',
      description: 'Comprehensive content and resources for your wellness journey.',
      section2: {
        title: 'Default Section 2',
        description: 'Default content for section 2.'
      },
      section3: {
        title: 'Default Section 3',
        description: 'Default content for section 3.'
      }
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
        className="relative h-screen max-h-[1000px] flex flex-col overflow-hidden"
        style={{ background: config.background }}
      >
        {/* Navigation Pills */}
        <div className="flex gap-2 px-6 py-4 flex-shrink-0">
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

        {/* Hero Section */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-8 gap-8 min-h-0 overflow-y-auto">
          <div className="flex-1 max-w-2xl flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {config.hero.title}
            </h1>
            <h2 className="text-lg lg:text-xl font-semibold text-white mb-6">
              {config.hero.subtitle}
            </h2>
            <p className="text-base lg:text-lg text-white mb-8 leading-relaxed">
              {config.hero.description}
            </p>

            {/* Audio Player */}
            <div className="bg-white rounded-2xl p-4 mb-8">
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

            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
              Try Lifestyle
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-80 bg-black rounded-3xl p-2">
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
        <div className="px-6 lg:px-24 pb-6 flex-shrink-0">
          <div className="flex flex-wrap gap-3">
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
