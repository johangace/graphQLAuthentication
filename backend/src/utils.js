function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter((permissionTheyHave) =>
    permissionsNeeded.includes(permissionTheyHave),
  )
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `)
  }
}

const _hasPermission = hasPermission
export { _hasPermission as hasPermission }
