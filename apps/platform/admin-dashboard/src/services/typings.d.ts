declare namespace API {
  type CurrentUser = {
    id: string;
    name: string;
    avatar?: string;
    email: string;
    role: 'admin' | 'manager' | 'user';
    permissions?: string[];
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    address?: string;
    phone?: string;
  };
}
