from __future__ import annotations

from typing import Any

from apps.common.models import AdminActionAudit
from apps.users.models import UserRole

ADMIN_MUTATION_ROLES = {
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MODERATOR,
}
PRIVILEGED_METHODS = {"POST", "PUT", "PATCH", "DELETE"}


def _resolve_target(target: Any) -> tuple[str, str]:
    if target is None:
        return "", ""
    model_name = ""
    target_id = ""
    if hasattr(target, "_meta"):
        model_name = target._meta.label_lower
    elif isinstance(target, type):
        model_name = target.__name__
    else:
        model_name = target.__class__.__name__
    if hasattr(target, "pk") and target.pk is not None:
        target_id = str(target.pk)
    return model_name, target_id


def _extract_ip(request) -> str:
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def should_log_admin_action(request) -> bool:
    user = getattr(request, "user", None)
    if not user or not user.is_authenticated:
        return False
    return user.role in ADMIN_MUTATION_ROLES and request.method in PRIVILEGED_METHODS


def log_admin_action(request, action: str, *, target: Any = None, metadata: dict[str, Any] | None = None) -> None:
    if not should_log_admin_action(request):
        return

    target_model, target_id = _resolve_target(target)
    payload = metadata or {}
    if not isinstance(payload, dict):
        payload = {"value": str(payload)}

    # Best-effort write: admin actions should not fail because of audit persistence.
    try:
        AdminActionAudit.objects.create(
            actor=request.user,
            action=action,
            target_model=target_model,
            target_id=target_id,
            request_path=request.path,
            request_method=request.method,
            ip_address=_extract_ip(request),
            user_agent=(request.META.get("HTTP_USER_AGENT", "") or "")[:255],
            metadata=payload,
        )
    except Exception:
        return
