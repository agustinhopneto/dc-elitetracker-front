import { type ReactNode, createContext, useState, useContext } from 'react';

import { api } from '../services/api';

export type UserData = {
  id: string;
  name: string;
  avatarUrl: string;
  token: string;
};

type UserContextProps = {
  getUserInfo: (githubCode: string) => void;
  userData: UserData;
};

type UserProviverProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: UserProviverProps) {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  async function getUserInfo(githubCode: string) {
    const { data } = await api.get<UserData>('/auth/callback', {
      params: {
        code: githubCode,
      },
    });

    setUserData(data);
  }

  return (
    <UserContext.Provider value={{ userData, getUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used with UserContext.');
  }

  return context;
}
