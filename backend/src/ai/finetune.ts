export async function initiateFinetuningJob(
  apiKey: string,
  trainingFileId: string,
  baseModel: string = 'gpt-4o-mini'
): Promise<{ jobId: string; status: string }> {
  const url = 'https://api.openai.com/v1/fine_tuning/jobs';

  const payload = {
    training_file: trainingFileId,
    model: baseModel,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  return {
    jobId: resData.id || '',
    status: resData.status || 'failed',
  };
}
