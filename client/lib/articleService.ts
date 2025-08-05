import { getLocale, supabase } from "./supabase";

// Test function to check basic database connectivity
export const testConnection = async () => {
  try {
    console.log("🔍 Testing database connection...");
    
    // Test basic articles table access
    const { data: articlesData, error: articlesError } = await supabase
      .from("articles")
      .select("id, section, subsection")
      .limit(5);
    
    console.log("📊 Articles test:", { articlesData, articlesError });

    // Test article_contents table access  
    const { data: contentsData, error: contentsError } = await supabase
      .from("article_contents")
      .select("id, title, locale")
      .limit(5);
      
    console.log("📊 Article contents test:", { contentsData, contentsError });

    return { success: true, articlesData, contentsData };
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
    return { success: false, error };
  }
};

// Debug function to check what subsections exist in the database
export const debugSubsections = async (section: string) => {
  try {
    console.log("🔍 Checking available subsections for section:", section);
    
    // First check if any articles exist for this section
    const { data: allArticles, error: allError } = await supabase
      .from("articles")
      .select("id, section, subsection")
      .eq("section", section)
      .limit(10);
    
    if (allError) {
      console.error("❌ Error fetching articles for section:", allError);
      return [];
    }
    
    console.log("📊 Found", allArticles?.length || 0, "articles for section", section);
    if (allArticles && allArticles.length > 0) {
      console.log("📋 Sample articles:", allArticles);
    }
    
    // Get all unique subsections for this section
    const { data: subsections, error } = await supabase
      .from("articles")
      .select("subsection")
      .eq("section", section)
      .neq("subsection", null);
    
    if (error) {
      console.error("❌ Error fetching subsections:", error);
      return [];
    }
    
    const uniqueSubsections = [...new Set(subsections?.map(item => item.subsection) || [])];
    console.log("📊 Available subsections for", section + ":", uniqueSubsections);
    
    return uniqueSubsections;
  } catch (error) {
    console.error("❌ Error in debugSubsections:", error);
    return [];
  }
};

export interface Article {
  id: string;
  section: string;
  subsection: string;
  popularity: number;
  image_url: string;
  title?: string;
}

export interface ArticleWithContent extends Article {
  title: string;
}

export const fetchArticlesBySection = async (
  section: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("Fetching articles for section:", section, "locale:", locale);

    // Fetch articles with their content (title) by section, ordered by popularity
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        is_published,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    console.log("Fetched articles data:", data);

    // Transform the data to flatten the title
    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchArticlesBySection:", error);
    return [];
  }
};

export const fetchArticlesBySubsection = async (
  section: string,
  subsection: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();

    // Fetch articles with their content (title) by section and subsection, ordered by popularity
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("subsection", subsection)
      .eq("article_contents.locale", locale)
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching articles by subsection:", error);
      return [];
    }

    // Transform the data to flatten the title
    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchArticlesBySubsection:", error);
    return [];
  }
};

export const fetchTrendingBySection = async (
  section: string,
  limit: number = 8,
): Promise<string[]> => {
  try {
    const locale = getLocale();

    // Fetch trending article titles by section
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching trending articles:", error);
      return [];
    }

    return (
      data?.map(
        (article) => article.article_content?.[0]?.title || "No title",
      ) || []
    );
  } catch (error) {
    console.error("Error in fetchTrendingBySection:", error);
    return [];
  }
};

// Fetch latest articles by section
export const fetchLatestArticlesBySection = async (
  section: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("Fetching latest articles for section:", section);

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        created_at,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching latest articles:", error);
      return [];
    }

    console.log("Latest articles data:", data);

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchLatestArticlesBySection:", error);
    return [];
  }
};

// Fetch popular articles by section
export const fetchPopularArticlesBySection = async (
  section: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        views,
        monthly_views,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("views", { ascending: false })
      .order("monthly_views", { ascending: false })
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching popular articles:", error);
      return [];
    }

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchPopularArticlesBySection:", error);
    return [];
  }
};

// Fetch latest articles by subsection
export const fetchLatestArticlesBySubsection = async (
  section: string,
  subsection: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("🔍 fetchLatestArticlesBySubsection:", { section, subsection, locale, limit });

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        created_at,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("subsection", subsection)
      .eq("article_contents.locale", locale)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("❌ Error fetching latest articles by subsection:", error);
      return [];
    }

    console.log("✅ fetchLatestArticlesBySubsection result:", data?.length, "articles");

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchLatestArticlesBySubsection:", error);
    return [];
  }
};

// Fetch popular articles by subsection
export const fetchPopularArticlesBySubsection = async (
  section: string,
  subsection: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("🔍 fetchPopularArticlesBySubsection:", { section, subsection, locale, limit });

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        views,
        monthly_views,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("subsection", subsection)
      .eq("article_contents.locale", locale)
      .order("views", { ascending: false })
      .order("monthly_views", { ascending: false })
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("❌ Error fetching popular articles by subsection:", error);
      return [];
    }

    console.log("✅ fetchPopularArticlesBySubsection result:", data?.length, "articles");

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("Error in fetchPopularArticlesBySubsection:", error);
    return [];
  }
};

// Fetch all articles by section with pagination
export const fetchAllArticlesBySection = async (
  section: string,
  page: number = 1,
  limit: number = 16,
): Promise<{ articles: ArticleWithContent[]; totalCount: number }> => {
  try {
    const locale = getLocale();
    const offset = (page - 1) * limit;

    // Get total count
    const { count } = await supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("section", section);

    // Get articles
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        created_at,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching all articles:", error);
      return { articles: [], totalCount: 0 };
    }

    const articles =
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || [];

    return { articles, totalCount: count || 0 };
  } catch (error) {
    console.error("Error in fetchAllArticlesBySection:", error);
    return { articles: [], totalCount: 0 };
  }
};

// Fetch trending articles by section using monthly_views
export const fetchTrendingArticlesBySection = async (
  section: string,
  limit: number = 8,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("🔥 Fetching trending articles for section:", section, "using monthly_views");

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        monthly_views,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_contents.locale", locale)
      .order("monthly_views", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("❌ Error fetching trending articles:", error);
      return [];
    }

    console.log("🔥 Trending articles result:", data?.length, "articles");

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("❌ Error in fetchTrendingArticlesBySection:", error);
    return [];
  }
};

// Fetch top articles by subsection for menu display
export const fetchTopArticlesBySubsection = async (
  section: string,
  subsection: string,
  limit: number = 4,
): Promise<ArticleWithContent[]> => {
  try {
    const locale = getLocale();
    console.log("⭐ Fetching top articles for subsection:", section, subsection);

    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image,
        views,
        monthly_views,
        article_contents!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("subsection", subsection)
      .eq("article_contents.locale", locale)
      .order("views", { ascending: false })
      .order("monthly_views", { ascending: false })
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("❌ Error fetching top articles by subsection:", error);
      return [];
    }

    console.log("⭐ Top articles result:", data?.length, "articles for", subsection);

    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image,
        title: article.article_contents?.[0]?.title || "No title",
      })) || []
    );
  } catch (error) {
    console.error("❌ Error in fetchTopArticlesBySubsection:", error);
    return [];
  }
};
