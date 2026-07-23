import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function main() {
  const email = 'test-pilot@saqynrabt.com';
  
  // Delete existing if any
  try {
    const existing = await clerk.users.getUserList({ emailAddress: [email] });
    for (const u of existing.data) {
      await clerk.users.deleteUser(u.id);
      console.log('Deleted existing user:', u.id);
    }
  } catch {}

  // Create user
  const user = await clerk.users.createUser({
    emailAddress: [email],
    password: 'TestPilot123!',
    skipPasswordChecks: true,
    skipPasswordRequirement: true,
  });
  console.log('Created user:', user.id, email);

  // Create sign-in token
  const token = await clerk.signInTokens.createSignInToken({
    userId: user.id,
    expiresInSeconds: 3600,
  });
  console.log('\nSign-in URL:');
  console.log(token.url);
  console.log('\nToken valid for 1 hour.');
}

main().catch(console.error);
