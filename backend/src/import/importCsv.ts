export function parseEmployeesCSV(csvContent: string): Array<{ name: string; email: string; role: string }> {
  const lines = csvContent.split('\n');
  const results: Array<{ name: string; email: string; role: string }> = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const [name, email, role] = line.split(',');
    if (name && email) {
      results.push({
        name: name.trim(),
        email: email.trim(),
        role: (role || 'employee').trim(),
      });
    }
  }

  return results;
}
