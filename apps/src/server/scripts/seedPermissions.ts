import { PrismaClient } from '@prisma/client';
import { 
  SYSTEM_PERMISSIONS, 
  WORKSPACE_PERMISSIONS, 
  MODULE_PERMISSIONS,
  DEFAULT_ROLE_PERMISSIONS,
  PermissionCategory
} from '../../auth/permissions/types';

/**
 * Seeds the database with default permissions and role permissions
 */
export async function seedPermissions(prisma: PrismaClient) {
  console.log('Seeding permissions...');

  // Combine all permissions
  const allPermissions = [
    ...SYSTEM_PERMISSIONS,
    ...WORKSPACE_PERMISSIONS,
    ...MODULE_PERMISSIONS
  ];

  // Create permissions
  for (const permission of allPermissions) {
    await prisma.permission.upsert({
      where: { slug: permission.slug },
      update: {
        name: permission.name,
        description: permission.description,
        category: permission.category
      },
      create: {
        name: permission.name,
        description: permission.description,
        slug: permission.slug,
        category: permission.category
      }
    });
  }

  console.log(`Created ${allPermissions.length} permissions`);

  // Create role permissions
  const roles = Object.keys(DEFAULT_ROLE_PERMISSIONS);
  
  for (const role of roles) {
    const permissionSlugs = DEFAULT_ROLE_PERMISSIONS[role as keyof typeof DEFAULT_ROLE_PERMISSIONS];
    
    // Get permission IDs
    const permissions = await prisma.permission.findMany({
      where: {
        slug: {
          in: permissionSlugs
        }
      }
    });

    // Create role permissions
    for (const permission of permissions) {
      await prisma.rolePermission.upsert({
        where: {
          role_permissionId: {
            role: role as any,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          role: role as any,
          permissionId: permission.id
        }
      });
    }

    console.log(`Created ${permissions.length} permissions for role ${role}`);
  }

  console.log('Permissions seeding completed');
}
