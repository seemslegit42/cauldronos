import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

export default function Home() {
  const { userId } = auth();
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard');
  }
  
  // Otherwise, redirect to login page
  redirect('/sign-in');
}
