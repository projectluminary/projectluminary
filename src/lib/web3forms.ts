// Web3Forms access keys are public frontend identifiers, not private API secrets.
export async function submitWeb3Form(accessKey: string | undefined, fields: Record<string, string>): Promise<void> {
  const key = accessKey?.trim();
  if (!key || key === 'your_web3forms_access_key_here') {
    throw new Error('Submissions are temporarily unavailable because this form is not configured. Please contact Project Luminary using the contact details on this website.');
  }
  let response: Response;
  try {
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ ...fields, access_key: key }),
      signal: AbortSignal.timeout(20000)
    });
  } catch {
    throw new Error('Unable to confirm submission. Please check your connection and try again later. If you retry, your message may be sent twice.');
  }
  let result: unknown;
  try { result = await response.json(); } catch {
    throw new Error('The submission service returned an unexpected response. Submission could not be confirmed. Please try again later.');
  }
  if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) {
    throw new Error('The submission service could not confirm your request. Please try again later or contact Project Luminary directly.');
  }
}
