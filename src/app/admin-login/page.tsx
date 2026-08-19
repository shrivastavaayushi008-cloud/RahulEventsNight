import { redirect } from 'next/navigation';

// Redirect /admin-login to /#/admin-login (hash route)
export default function AdminLoginRedirect() {
  redirect('/#/admin-login');
}
