import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with the vector database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

try {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found, vector search functionality will be limited');
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

interface CompanyEmbedding {
  content: string;
  similarity: number;
}

export const saveCompanyData = async (companyUrl: string, data: any) => {
  if (!supabase) {
    console.warn('Supabase not initialized, skipping data save');
    return null;
  }

  try {
    const { data: embedding, error } = await supabase
      .from('company_embeddings')
      .insert([
        {
          url: companyUrl,
          content: data,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return embedding;
  } catch (error) {
    console.error('Error saving company data:', error);
    throw error;
  }
};

export const queryCompanyData = async (companyUrl: string, query: string): Promise<CompanyEmbedding[]> => {
  if (!supabase) {
    console.warn('Supabase not initialized, returning empty results');
    return [];
  }

  try {
    const { data: matches, error } = await supabase
      .rpc('match_company_embeddings', {
        query_embedding: query,
        company_url: companyUrl,
        match_threshold: 0.8,
        match_count: 5,
      });

    if (error) throw error;
    return matches || [];
  } catch (error) {
    console.error('Error querying company data:', error);
    return [];
  }
};