import supabase from '../supabaseClient';

export async function getUsername(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching username:', error.message);
    return null;
  }

  const displayName = data?.username || 'Unknown User';
  console.log('Display Name:', displayName);

  return data?.username || null;
}