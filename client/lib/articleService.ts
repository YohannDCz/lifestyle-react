import { supabase, getLocale } from "./supabase";

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

    // Fetch articles with their content (title) by section, ordered by popularity
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        section,
        subsection,
        popularity,
        image_url,
        article_content!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_content.locale", locale)
      .order("popularity", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    // Transform the data to flatten the title
    return (
      data?.map((article) => ({
        id: article.id,
        section: article.section,
        subsection: article.subsection,
        popularity: article.popularity,
        image_url: article.image_url,
        title: article.article_content?.[0]?.title || "No title",
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
        image_url,
        article_content!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("subsection", subsection)
      .eq("article_content.locale", locale)
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
        image_url: article.image_url,
        title: article.article_content?.[0]?.title || "No title",
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
        article_content!inner(
          title
        )
      `,
      )
      .eq("section", section)
      .eq("article_content.locale", locale)
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
