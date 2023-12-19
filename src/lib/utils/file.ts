export async function downloadFile(url: string, type: string) {
  const now = new Date();
  const dateInfo = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  const timeInfo = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

  // format: boble_<type>_<year>-<month>-<day>_<hour>-<minute>-<second>
  const fileName = `boble_${type}_${dateInfo}_${timeInfo}`; 

  const response = await fetch(url); 
  const blob = await response.blob();

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
