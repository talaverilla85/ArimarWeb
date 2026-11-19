-- Migration 002: WebAuthn passkeys for an admin device.
-- Test-only until the operator enrolls a passkey and verifies recovery.
CREATE TABLE IF NOT EXISTS pata_admin_passkeys (
 id text PRIMARY KEY,
 public_key_b64 text NOT NULL,
 sign_counter bigint NOT NULL DEFAULT 0,
 transports jsonb NOT NULL DEFAULT '[]'::jsonb,
 device_type varchar(24) NOT NULL,
 backed_up boolean NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 revoked_at timestamptz
);
-- Only one authorized passkey at a time. Revocation must be performed by an administrator.
CREATE UNIQUE INDEX IF NOT EXISTS pata_one_active_passkey
 ON pata_admin_passkeys((true)) WHERE revoked_at IS NULL;
CREATE TABLE IF NOT EXISTS pata_admin_webauthn_challenges (
 ticket_hash char(64) PRIMARY KEY,
 challenge varchar(200) NOT NULL,
 purpose varchar(16) NOT NULL CHECK (purpose IN ('register','login')),
 expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS pata_passkey_challenges_expiry
 ON pata_admin_webauthn_challenges(expires_at);
