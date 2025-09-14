import speakeasy from 'speakeasy';

export function generateTOTPSecret() {
  return speakeasy.generateSecret({ length: 20 });
}

export function generateTOTPToken(secret: string) {
  return speakeasy.totp({
    secret,
    encoding: 'base32',
    step: 30,
  });
}

export function verifyTOTPToken(secret: string, token: string) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1
  });
}
