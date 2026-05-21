import IsAuth from '@/components/auth/components/user-data/is-auth';
import { UserResponse } from '@/interfaces/user';
import { AUTH_FAILED } from '@/lib/constants/messages';
import { endpoints } from '@/lib/constants/endpoints';
import { apiServerService } from '@/lib/services/api/server';

export async function UserAuthData() {
  let user = null;

  try {
    const response = await apiServerService.get<UserResponse>(
      `${endpoints.user.base}${endpoints.user.getUser}`
    );

    if (!response.user) {
      throw new Error(AUTH_FAILED);
    }

    user = response.user;
  } catch {
    user = null;
  }

  return <IsAuth user={user} />;
}
