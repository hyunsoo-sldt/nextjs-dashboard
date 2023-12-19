import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // 리다이렉트 되는 페이지 설정 : pages
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // "/dashboard..." 페이지의 권한 설정(로그인 하지 않으면 /login 페이지로 리다이렉트)
    authorized({ auth, request: { nextUrl } }) {
      console.log('nextUrl ::: ', nextUrl);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
