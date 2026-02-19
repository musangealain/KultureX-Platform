from .base import *  # noqa

DEBUG = True

# Dev UX: allow local LAN access for web/mobile testing.
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True
