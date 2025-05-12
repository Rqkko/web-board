import supabase from '../supabaseClient';
import { generatePublicUrl } from './publicUrlGenerator';

interface UserProfile {
  username: string;
  profilePicture: string | null;
}

export async function getUser(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('username, profile_picture')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching username:', error.message);
    return null;
  }

  const displayName = data?.username || 'Unknown User';

  let pictureUrl = null;
  if (data?.profile_picture) {
    pictureUrl = generatePublicUrl('profile-pictures', data.profile_picture)
  }

  return { username: displayName, profilePicture: pictureUrl };
}
