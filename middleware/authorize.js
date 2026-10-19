export function authorizeModification(req, res, next) {
  const user = req.user;
  const isParent = user?.role === "parent";
  const isChildEditingOwnList =
    user?.role === "child" &&
    String(req.params.userId) === String(user.id);

  if (!isParent && !isChildEditingOwnList) {
    return res.status(403).json({
      error: "Access denied"
    });
  }

  return next();
}
